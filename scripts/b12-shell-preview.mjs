import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { parseDocument, buildIds } from './seo-validation/evidence.mjs';
const base='http://127.0.0.1:4305';const build=readFileSync('.next/BUILD_ID','utf8').trim();const requests=[],rows=[];
async function get(path){if(!path.startsWith('/')||path.startsWith('//'))throw new Error('Nonlocal path');const response=await fetch(base+path,{redirect:'error',signal:AbortSignal.timeout(10000)});requests.push({path,method:'GET',status:response.status});return {response,html:await response.text()};}
const sitemap=(await get('/sitemap.xml')).html;
const urls=JSON.parse(execFileSync('python3',['-c',"import json,sys,xml.etree.ElementTree as E;root=E.fromstring(sys.stdin.read());print(json.dumps([n.text for n in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]))"],{input:sitemap,encoding:'utf8'}));
const paths=urls.map(url=>{const u=new URL(url);if(u.origin!=='https://whats91.com')throw new Error('Unexpected sitemap origin');return u.pathname;});
for(const path of [...new Set([...paths,'/design-system','/checkout','/legal/dpa','/trust/subprocessors','/b12-unknown-route'])]){
 const {response,html}=await get(path);const doc=parseDocument(html),main=doc.elements.filter(e=>e.tag==='main'),skip=doc.elements.filter(e=>e.tag==='a'&&(e.attrs.class||'').split(' ').includes('skip-link'));
 const checks=[{name:'expected status',ok:response.status===(path==='/b12-unknown-route'?404:200)},{name:'exact build identity',ok:JSON.stringify(buildIds(doc))===JSON.stringify([build])},{name:'one native main target',ok:main.length===1&&main[0].attrs.id==='main-content'&&main[0].attrs.tabindex==='-1'},{name:'shell skip contract',ok:['/design-system','/b12-unknown-route'].includes(path)?skip.length===0:skip.length===1&&skip[0].attrs.href==='#main-content'}];rows.push({path,designPreview:path==='/design-system',checks});
}
const baseline=JSON.parse(readFileSync('docs/evidence/b11-2026-09-28/baseline.json','utf8'));
const candidates=baseline.mainCandidates.map(path=>({source:path,runtimePaths:path.includes('/authors/[slug]')?paths.filter(p=>p.startsWith('/authors/')):[path.replace('src/app','').replace('/page.tsx','')||'/']}));
for(const candidate of candidates)if(candidate.runtimePaths.some(path=>!rows.some(row=>row.path===path)))throw new Error('Missing main candidate '+candidate.source);
const evidence={buildId:build,sourceCandidates:candidates,sitemapUrls:urls.length,rows,requests,scope:'All sitemap HTML plus four deliberate non-sitemap surfaces and an unknown 404; actual parsed initial HTML main/skip/build/status; local GET only; not accessibility or content-truth certification'};
writeFileSync('docs/evidence/b12-2026-09-28/built-shells.json',JSON.stringify(evidence,null,2)+'\n');
const checks=rows.flatMap(row=>row.checks);console.log(JSON.stringify({routes:rows.length,checks:checks.length,failures:rows.flatMap(row=>row.checks.filter(c=>!c.ok).map(c=>({path:row.path,...c})))}));if(checks.some(c=>!c.ok))process.exitCode=1;
