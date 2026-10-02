import crypto from 'node:crypto';
import { assertExact } from './candidate.mjs';

class RehearsalError extends Error { constructor(code,uncertain=false){super(code);this.uncertain=uncertain;} }
async function bounded(fn,ms,grace) {
 const controller=new AbortController();let settled=false,timer;
 const work=Promise.resolve().then(()=>fn(controller.signal)).finally(()=>{settled=true;});
 try {return await Promise.race([work,new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(new RehearsalError('OPERATION_TIMEOUT'));},ms);})]);}
 catch(error){if(!settled){let wait;await Promise.race([work.catch(()=>{}),new Promise(resolve=>{wait=setTimeout(resolve,grace);})]);clearTimeout(wait);}throw new RehearsalError(error instanceof RehearsalError?error.message:'OPERATION_FAILED',!settled);}
 finally{clearTimeout(timer);}
}
function validate(config,ports) {
 if(config.mode!=='offline'||ports.processKind!=='mock'||ports.networkKind!=='mock'||ports.store.kind!=='owned-scratch')throw new RehearsalError('OFFLINE_PORTS_REQUIRED');
 if(!/^[a-zA-Z0-9][\w-]{0,63}$/.test(config.service)||config.service==='all')throw new RehearsalError('NAMED_SERVICE_REQUIRED');
 for(const value of [config.operationMs,config.abortGraceMs,config.notificationMs])if(!Number.isInteger(value)||value<1||value>3600000)throw new RehearsalError('EXPLICIT_BOUNDS_REQUIRED');
 if(![config.contentSha256,config.previousContentSha256].every(value=>/^[a-f0-9]{64}$/.test(value)))throw new RehearsalError('CONTENT_PIN_REQUIRED');
}
function healthExact(receipt,m,pin){return receipt?.status===200&&receipt.readiness?.status==='ready'&&receipt.readiness.scope==='website'&&['candidateId','buildId','version'].every(k=>receipt.readiness[k]===m[k])&&receipt.version?.version===m.version&&receipt.contentSha256===pin;}
export async function rehearseRelease(manifest,expected,inputs,config,ports) {
 validate(config,ports);assertExact(manifest,expected);
 const store=ports.store,owner=crypto.randomUUID();store.acquire(owner);let held=true,switched=false,previous,preserveLock=false,phase='preflight',outcome;
 const call=fn=>bounded(fn,config.operationMs,config.abortGraceMs),run=async args=>{const result=await ports.run(args);if(result?.exitCode!==0)throw new RehearsalError('COMMAND_FAILED');return result;},health=m=>call(signal=>ports.health({candidate:m,service:config.service,signal})),restart=m=>call(signal=>run({command:'pm2',args:['restart',config.service,'--update-env'],candidate:m,signal}));
 try {
  const pointers=store.pointers();previous=pointers.current;
  const replay=store.receipt(manifest.candidateId);
  if(replay&&pointers.current.candidateId!==manifest.candidateId)throw new RehearsalError('REPLAY_NOT_CURRENT');
  if(pointers.current.candidateId===manifest.candidateId){phase='replay-health';previous=pointers.previous;switched=!!previous;if(!healthExact(await health(manifest),manifest,config.contentSha256)){if(!previous)throw new RehearsalError('REPLAY_UNHEALTHY',true);throw new RehearsalError('REPLAY_UNHEALTHY');}switched=false;store.record(manifest.candidateId,{status:'verified',candidateId:manifest.candidateId});outcome={status:'replayed',candidateId:manifest.candidateId};}
  else {
   phase='copy';const stage=store.stage(manifest,inputs);
   phase='install';await call(signal=>run({command:'npm',args:['ci','--ignore-scripts'],cwd:stage.source,signal}));
   phase='build';await call(signal=>run({command:'npm',args:['run','build'],cwd:stage.source,signal}));
   phase='verify';store.verify(stage,manifest);store.publish(stage,manifest);
   phase='switch';store.switch({current:manifest,previous});switched=true;
   phase='start';await restart(manifest);
   phase='health';if(!healthExact(await health(manifest),manifest,config.contentSha256))throw new RehearsalError('HEALTH_IDENTITY_FAILED');
   store.record(manifest.candidateId,{status:'verified',candidateId:manifest.candidateId});outcome={status:'verified',candidateId:manifest.candidateId};
  }
 } catch(error) {
  preserveLock=!!error.uncertain;let recovery='previous-preserved';
  if(switched&&!preserveLock){try{store.switch({current:previous,previous:manifest});await restart(previous);if(!healthExact(await health(previous),previous,config.previousContentSha256))throw new RehearsalError('RECOVERY_HEALTH_FAILED');recovery='previous-restored-and-verified-mock';}catch(e){preserveLock=true;recovery=e.uncertain?'recovery-uncertain':'recovery-failed';}}
  outcome={status:'failed',phase,code:error instanceof RehearsalError?error.message:'REHEARSAL_FAILED',recovery,lockHeld:preserveLock};
 } finally {if(!preserveLock){store.release(owner);held=false;}}
 // Optional injected mock notification is independently bounded and cannot
 // alter candidate/recovery truth or disclose raw error/output/private values.
 let notification='disabled';
 if(ports.notify){try{await bounded(signal=>ports.notify({status:outcome.status,candidateId:manifest.candidateId,signal}),config.notificationMs,config.abortGraceMs);notification='mock-completed';}catch{notification='mock-failed-or-timeout';}}
 return{...outcome,lockHeld:held,notification,scope:'OFFLINE MOCK REHEARSAL ONLY; no deployed or real rollback proof'};
}
