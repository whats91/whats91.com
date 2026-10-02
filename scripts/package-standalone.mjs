import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { sourceFiles,treeFiles,checkFiles,createManifest,verifyPackage,digest } from './release/candidate.mjs';

export function packageStandalone(root,{sources,head}={}) {
 const next=path.join(root,'.next'),standalone=path.join(next,'standalone');
 for(const rel of ['standalone/server.js','BUILD_ID','static','server/app-paths-manifest.json'])if(!fs.existsSync(path.join(next,rel)))throw new Error('MISSING_BUILD_ARTIFACT');
 const before=sources||sourceFiles(root);checkFiles(root,before.files);
 const receipt=JSON.parse(fs.readFileSync(path.join(next,'build-source-receipt.json'),'utf8'));checkFiles(root,receipt.runtimeFiles);const currentRuntime=Object.fromEntries(Object.entries(before.files).filter(([p])=>!p.startsWith('docs/')&&!p.startsWith('tests/')));if(digest(currentRuntime)!==digest(receipt.runtimeFiles)||JSON.stringify(before.deletedSources||[])!==JSON.stringify(receipt.deletedSources||[])||head&&head!==receipt.head)throw new Error('BUILD_SOURCE_MISMATCH');
 fs.copyFileSync(path.join(next,'build-source-receipt.json'),path.join(standalone,'build-source-receipt.json'));
 const copyTree=(from,to)=>{const files=treeFiles(from);if(!Object.keys(files).length)throw new Error('EMPTY_REQUIRED_TREE');fs.cpSync(from,to,{recursive:true,errorOnExist:false,dereference:false});if(digest(treeFiles(to))!==digest(files))throw new Error('COPY_ARTIFACT_MISMATCH');};
 copyTree(path.join(next,'static'),path.join(standalone,'.next/static'));copyTree(path.join(root,'public'),path.join(standalone,'public'));
 for(const rel of ['version.txt','node_modules/next/package.json','.next/BUILD_ID','.next/server/app-paths-manifest.json'])if(!fs.existsSync(path.join(standalone,rel)))throw new Error('MISSING_STANDALONE_ARTIFACT');
 const flows=treeFiles(path.join(root,'src/lib/flows/json')),packed=treeFiles(path.join(standalone,'src/lib/flows/json'));if(Object.keys(flows).length!==11||digest(flows)!==digest(packed))throw new Error('FLOW_PACKAGING_MISMATCH');
 fs.copyFileSync(path.join(root,'scripts/start-standalone.mjs'),path.join(standalone,'start.mjs'));fs.mkdirSync(path.join(standalone,'release-contract'),{recursive:true});fs.copyFileSync(path.join(root,'scripts/release/candidate.mjs'),path.join(standalone,'release-contract/candidate.mjs'));
 const artifacts=treeFiles(standalone,{exclude:['.next/cache']});delete artifacts['release-manifest.json'];delete artifacts['release-identity.json'];
 const buildId=fs.readFileSync(path.join(next,'BUILD_ID'),'utf8').trim();if(fs.readFileSync(path.join(standalone,'.next/BUILD_ID'),'utf8').trim()!==buildId)throw new Error('BUILD_ID_MISMATCH');
 const m=createManifest({head:head||execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),buildId,version:fs.readFileSync(path.join(root,'version.txt'),'utf8').trim(),sourceFiles:before.files,excluded:before.excluded,deletedSources:before.deletedSources||[],artifacts});
 fs.writeFileSync(path.join(standalone,'release-manifest.json'),JSON.stringify(m,null,2)+'\n');fs.writeFileSync(path.join(standalone,'release-identity.json'),JSON.stringify({candidateId:m.candidateId,buildId:m.buildId,version:m.version})+'\n');verifyPackage(standalone,m);return m;
}
if(process.argv[1]===fileURLToPath(import.meta.url)){try{const m=packageStandalone(process.cwd());console.log(JSON.stringify({candidateId:m.candidateId,buildId:m.buildId,sourceFiles:Object.keys(m.sourceFiles).length,artifacts:Object.keys(m.artifacts).length}));}catch{console.error('Standalone packaging failed');process.exitCode=1;}}
