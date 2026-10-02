import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

// Only these explicitly retired paths may be absent from tracked source.
// All other missing source fails; reintroducing a retired path also fails.
export const inheritedRetiredSourcePaths=[
 'public/.well-known/oauth-authorization-server','public/.well-known/protected-resource',
 'prisma/schema.prisma','src/lib/db.ts','src/lib/recaptcha.ts','src/lib/bot-master.ts',
 'src/lib/crm-leads.ts','src/app/api/contact/route.ts','src/app/api/demo/route.ts',
 'src/lib/redis.ts','src/app/api/webhooks/github/route.ts','scripts/deploy.js','scripts/commit.js',
 'ecosystem.config.cjs'
];
export const hash = value => crypto.createHash('sha256').update(value).digest('hex');
export const digest = files => hash(JSON.stringify(Object.entries(files).sort(([a],[b])=>a.localeCompare(b))));
const privateName = n => /^\.env(?:\.|$)/.test(n)&&n!=='.env.example'||/\.(?:db|sqlite3?|pem|key|p12|log)$/i.test(n);
export function safeRelative(name) {
 if(typeof name!=='string'||!name||name.includes('\\')||name.split('/').some(p=>!p||p==='.'||p==='..'||privateName(p))||path.isAbsolute(name))throw new Error('UNSAFE_ARTIFACT');
 return name;
}
export function treeFiles(root,{exclude=[]}={}) {
 const rows={};
 function visit(dir,prefix='') { for(const n of fs.readdirSync(dir).sort()) { const rel=safeRelative(prefix+n);if(exclude.some(p=>rel===p||rel.startsWith(p+'/')))continue;const p=path.join(dir,n),s=fs.lstatSync(p);if(s.isSymbolicLink())throw new Error('SYMLINK_ARTIFACT');if(s.isDirectory())visit(p,rel+'/');else if(s.isFile())rows[rel]=hash(fs.readFileSync(p));else throw new Error('UNSUPPORTED_ARTIFACT'); } }
 visit(root);return rows;
}
export function sourceFiles(root) {
 const names=execFileSync('git',['ls-files','-co','--exclude-standard','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean),files={},excluded=[],deletedSources=[];
 for(const name of names) {
  if(name.startsWith('docs/evidence/')||name.startsWith('output/')){excluded.push(name);continue;}
  safeRelative(name);const p=path.join(root,name);if(!fs.existsSync(p)){if(!inheritedRetiredSourcePaths.includes(name))throw new Error('MISSING_SOURCE');deletedSources.push(name);continue;}if(inheritedRetiredSourcePaths.includes(name))throw new Error('RETIRED_SOURCE_RESTORED');const s=fs.lstatSync(p);if(!s.isFile()||s.isSymbolicLink())throw new Error('INVALID_SOURCE');files[name]=hash(fs.readFileSync(p));
 }
 for(const required of ['package.json','package-lock.json','next.config.ts','version.txt','src/lib/graph-form-submissions.ts'])if(!files[required])throw new Error('MISSING_SOURCE');
 return {files,excluded,deletedSources:deletedSources.sort()};
}
export function checkFiles(root,files) {
 for(const [name,expected]of Object.entries(files)){safeRelative(name);const p=path.join(root,name);if(!fs.existsSync(p))throw new Error('MISSING_SOURCE');if(inheritedRetiredSourcePaths.includes(name))throw new Error('RETIRED_SOURCE_RESTORED');const s=fs.lstatSync(p);if(!s.isFile()||s.isSymbolicLink()||hash(fs.readFileSync(p))!==expected)throw new Error('ARTIFACT_MISMATCH');}
}
export function validateManifest(m) {
 if(m?.format!=='whats91-candidate-v1'||!/^\w[\w.-]{0,79}$/.test(m.buildId)||!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(m.version)||! /^[a-f0-9]{40}$/.test(m.head))throw new Error('INVALID_IDENTITY');
 for(const files of [m.sourceFiles,m.artifacts]){if(!files||!Object.keys(files).length)throw new Error('EMPTY_CANDIDATE');for(const [p,h]of Object.entries(files)){safeRelative(p);if(!/^[a-f0-9]{64}$/.test(h))throw new Error('INVALID_HASH');}}
 if(!Array.isArray(m.deletedSources)||m.deletedSources.some(p=>!inheritedRetiredSourcePaths.includes(p)))throw new Error('UNAPPROVED_SOURCE_DELETION');
 const sourceDigest=hash(JSON.stringify({files:digest(m.sourceFiles),deletedSources:m.deletedSources})),artifactDigest=digest(m.artifacts),candidateId=hash(JSON.stringify({format:m.format,head:m.head,buildId:m.buildId,version:m.version,sourceDigest,artifactDigest}));
 if(m.sourceDigest!==sourceDigest||m.artifactDigest!==artifactDigest||m.candidateId!==candidateId)throw new Error('IDENTITY_MISMATCH');
 if(!m.sourceFiles['package-lock.json']||!m.sourceFiles['package.json']||!m.artifacts['start.mjs']||!m.artifacts['server.js']||!m.artifacts['.next/BUILD_ID']||!m.artifacts['version.txt'])throw new Error('INCOMPLETE_CANDIDATE');return m;
}
export function assertExact(m,expected) {
 validateManifest(m);
 for(const key of ['candidateId','head','buildId','sourceDigest','artifactDigest','version'])if(m[key]!==expected[key])throw new Error('EXACT_CANDIDATE_REQUIRED');
}
export function verifyNamedReleaseDirectory(root,m) {
 validateManifest(m);
 if(path.basename(path.resolve(root))!==m.candidateId)throw new Error('RELEASE_DIRECTORY_ID_MISMATCH');
 return m;
}
export function createManifest({head,buildId,version,sourceFiles:files,artifacts,excluded=[],deletedSources=[]}) {
 const format='whats91-candidate-v1',sourceDigest=hash(JSON.stringify({files:digest(files),deletedSources})),artifactDigest=digest(artifacts),candidateId=hash(JSON.stringify({format,head,buildId,version,sourceDigest,artifactDigest}));
 return validateManifest({format,head,buildId,version,sourceDigest,artifactDigest,candidateId,sourceFiles:files,artifacts,deletedSources,excludedEvidencePaths:excluded,authority:'LOCAL_CANDIDATE_ONLY / OPERATOR_APPROVAL_PENDING'});
}
export function verifyPackage(root,m) {
 validateManifest(m);const actual=treeFiles(root,{exclude:['.next/cache']});delete actual['release-manifest.json'];delete actual['release-identity.json'];
 if(digest(actual)!==m.artifactDigest)throw new Error('PACKAGE_SET_MISMATCH');checkFiles(root,m.artifacts);
 if(fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8').trim()!==m.buildId||fs.readFileSync(path.join(root,'version.txt'),'utf8').trim()!==m.version)throw new Error('PACKAGE_IDENTITY_MISMATCH');
 assertExact(JSON.parse(fs.readFileSync(path.join(root,'release-manifest.json'),'utf8')),m);
 const identity=JSON.parse(fs.readFileSync(path.join(root,'release-identity.json'),'utf8'));
 for(const key of ['candidateId','buildId','version'])if(identity[key]!==m[key])throw new Error('PACKAGE_METADATA_MISMATCH');return m;
}
