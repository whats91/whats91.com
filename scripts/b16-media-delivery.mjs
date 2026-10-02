import { readFileSync,writeFileSync,mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
const base='http://127.0.0.1:4305',evidence='docs/evidence/b16-2026-09-28',out='output/playwright/b16/derivatives';mkdirSync(out,{recursive:true});
const browser=JSON.parse(readFileSync(evidence+'/browser-media.json','utf8')),rows=[];
const paths=['/solutions/miracle/miracle-web-api-profile.png','/solutions/miracle/miracle-format-config.png','/solutions/miracle/miracle-logo.png','/solutions/miracle/whatsapp-icon.png','/og-image.png',...browser.optimizedURLs];
for(let i=0;i<paths.length;i++)for(const accept of paths[i].startsWith('/_next/image')?['image/webp','image/png']:['image/png']){
 const url=paths[i],r=await fetch(base+url,{headers:{accept},redirect:'error',signal:AbortSignal.timeout(10000)}),bytes=Buffer.from(await r.arrayBuffer());if(r.status!==200)throw new Error('Bad derivative '+url);
 const type=r.headers.get('content-type'),file=out+`/image-${i}-${accept.endsWith('webp')?'webp':'png'}.${type.includes('webp')?'webp':'png'}`;writeFileSync(file,bytes);
 rows.push({url,accept,file,bytes:bytes.length,status:r.status,type,sha256:createHash('sha256').update(bytes).digest('hex')});
}
const result={buildId:browser.buildIds[0],rows,boundary:'Exact current srcset URLs plus existing downloadable/full-size originals; local optimizer GET only, WebP and PNG Accept variants; no historic derivative/original or private media assertion.'};writeFileSync(evidence+'/media-delivery.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({buildId:result.buildId,outputs:rows.length,bytes:rows.reduce((a,r)=>a+r.bytes,0)}));
