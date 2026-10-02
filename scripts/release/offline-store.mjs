import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { checkFiles,verifyPackage,validateManifest } from './candidate.mjs';

// Explicit synthetic filesystem port. It has no existing-host/service/network
// access. Tests create the ownership marker in their own mkdtemp directory.
export function offlineStore(root,token) {
 if(!path.isAbsolute(root)||!/^[a-f0-9]{32}$/.test(token)||fs.lstatSync(root).isSymbolicLink()||fs.readFileSync(path.join(root,'.offline-fixture'),'utf8')!==token)throw new Error('OWNED_SCRATCH_REQUIRED');
 const within=p=>{const target=path.join(root,p);for(let part=target;part!==root;part=path.dirname(part))if(fs.existsSync(part)&&fs.lstatSync(part).isSymbolicLink())throw new Error('SCRATCH_SYMLINK_FORBIDDEN');return target;},json=p=>JSON.parse(fs.readFileSync(within(p),'utf8'));
 function atomic(p,value){const temp=within(p+'.'+crypto.randomUUID()+'.tmp');const fd=fs.openSync(temp,'wx',0o600);try{fs.writeFileSync(fd,JSON.stringify(value));fs.fsyncSync(fd);}finally{fs.closeSync(fd);}fs.renameSync(temp,within(p));const parent=fs.openSync(path.dirname(within(p)),'r');try{fs.fsyncSync(parent);}finally{fs.closeSync(parent);}}
 function pointer(value){for(const m of [value.current,value.previous].filter(Boolean)){validateManifest(m);verifyPackage(within('releases/'+m.candidateId+'/runtime'),m);}}
 return {
  kind:'owned-scratch',root,
  acquire(owner){try{fs.mkdirSync(within('lock'));}catch{throw new Error('LOCK_HELD');}fs.writeFileSync(within('lock/owner.json'),JSON.stringify({owner,createdAt:Date.now()}),{flag:'wx',mode:0o600});return owner;},
  release(owner){if(json('lock/owner.json').owner!==owner)throw new Error('LOCK_NOT_OWNED');fs.unlinkSync(within('lock/owner.json'));fs.rmdirSync(within('lock'));},
  lockInfo(){return json('lock/owner.json');},
  pointers(){const value=json('pointers.json');pointer(value);return value;},
  switch(value){pointer(value);atomic('pointers.json',value);},
  receipt(id){const p='receipts/'+id+'.json';return fs.existsSync(within(p))?json(p):null;},
  record(id,value){fs.mkdirSync(within('receipts'),{recursive:true});atomic('receipts/'+id+'.json',value);},
  stage(m,inputs){validateManifest(m);checkFiles(inputs.sourceRoot,m.sourceFiles);verifyPackage(inputs.runtimeRoot,m);const attempt=within('staging/'+crypto.randomUUID());fs.mkdirSync(attempt,{recursive:true});const source=path.join(attempt,'source'),runtime=path.join(attempt,'runtime');fs.mkdirSync(source);for(const p of Object.keys(m.sourceFiles)){const to=path.join(source,p);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(path.join(inputs.sourceRoot,p),to);}fs.mkdirSync(runtime);for(const p of [...Object.keys(m.artifacts),'release-manifest.json','release-identity.json']){const to=path.join(runtime,p);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(path.join(inputs.runtimeRoot,p),to);}checkFiles(source,m.sourceFiles);verifyPackage(runtime,m);return{source,runtime,attempt};},
  verify(stage,m){checkFiles(stage.source,m.sourceFiles);verifyPackage(stage.runtime,m);},
  publish(stage,m){const dest=within('releases/'+m.candidateId);fs.mkdirSync(within('releases'),{recursive:true});if(fs.existsSync(dest)){verifyPackage(path.join(dest,'runtime'),m);return;}fs.renameSync(stage.attempt,dest);},
  seed(m,inputs){const stage=this.stage(m,inputs);this.publish(stage,m);atomic('pointers.json',{current:m,previous:null});},
 };
}
