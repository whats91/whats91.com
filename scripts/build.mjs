import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
import { spawn } from 'node:child_process';
import { sourceFiles,checkFiles } from './release/candidate.mjs';
import { packageStandalone } from './package-standalone.mjs';
const root=process.cwd(),sources=sourceFiles(root);
async function run(script,args) {await new Promise((resolve,reject)=>{const c=spawn(process.execPath,[script,...args],{cwd:root,stdio:'inherit',shell:false});const timeout=setTimeout(()=>{c.kill('SIGTERM');reject(new Error('BUILD_TIMEOUT'));},30*60*1000);c.once('error',()=>{clearTimeout(timeout);reject(new Error('BUILD_START_FAILURE'));});c.once('exit',code=>{clearTimeout(timeout);if(code===0)resolve();else reject(new Error('BUILD_FAILURE'));});});}
try {await run('node_modules/next/dist/bin/next',['build','--webpack']);checkFiles(root,sources.files);const runtimeFiles=Object.fromEntries(Object.entries(sources.files).filter(([p])=>!p.startsWith('docs/')&&!p.startsWith('tests/')));fs.writeFileSync('.next/build-source-receipt.json',JSON.stringify({runtimeFiles,deletedSources:sources.deletedSources,head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim()})+'\n');const m=packageStandalone(root,{sources});console.log(JSON.stringify({buildId:m.buildId,candidateId:m.candidateId,packaging:'verified'}));}catch{console.error('Build/packaging failed; current working tree must not be promoted');process.exitCode=1;}
