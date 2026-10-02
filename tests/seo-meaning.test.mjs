import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { projectLoader } from './helpers/load-project-module.mjs';
import { validate } from '../scripts/seo-validation/run.mjs';
const mocks = new Map();
const load = projectLoader(mocks, (filename, source) => ts.transpileModule(source, { fileName: filename, compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText);
mocks.set('@/lib/seo/JsonLd', load('src/lib/seo/JsonLd.tsx'));
const config = load('src/lib/seo/config.ts');
const seo2 = load('src/lib/seo/seo2.ts');
const encoded = value => JSON.parse(JSON.stringify(value));

test('global graph identifies only the website brand, with resolved stable IDs and no assumed identity relations', () => {
  const { SEOJsonLD, OrganizationJsonLD } = load('src/components/seo/JsonLD.tsx');
  const html = renderToStaticMarkup(createElement(SEOJsonLD));
  const graph = [...html.matchAll(/<script[^>]*>(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]));
  assert.deepEqual(graph.map(n => n['@type']), ['Organization', 'WebSite']);
  assert.equal(graph[1].publisher['@id'], graph[0]['@id']);
  for (const n of graph) for (const field of ['foundingDate','legalName','parentOrganization','sameAs','address','contactPoint','offers','featureList','author']) assert.equal(n[field], undefined);
  assert.ok(!renderToStaticMarkup(createElement(OrganizationJsonLD, {})).includes('foundingDate'));
});

test('active and dormant software builders omit unknown price, version and operating system instead of making defaults', () => {
  const input = { name:'Fixture software', description:'Fixture description', url:'https://whats91.com/fixture' };
  for (const build of [config.generateSoftwareApplicationSchema, seo2.generateSoftwareAppSchema]) {
    const result = encoded(build(input));
    for (const field of ['offers','softwareVersion','releaseNotes','operatingSystem','aggregateRating','priceValidUntil']) assert.equal(result[field],undefined);
    assert.deepEqual(encoded(build({...input,operatingSystem:'Web',offers:{price:'0',priceCurrency:'INR'}})).offers,{'@type':'Offer',price:'0',priceCurrency:'INR'});
  }
  const tool = seo2.generatePageSchemas({...input,title:input.name,type:'tool'}).find(n=>n['@type']==='SoftwareApplication');
  assert.equal(encoded(tool).offers,undefined,'A generic tool classification cannot establish free access');
});

test('dormant article/product/service helpers emit no inferred count, review, expiry, person employment or service geography', () => {
  const input = {title:'Fixture',name:'Fixture',description:'Short description',url:'https://whats91.com/fixture',author:{name:'Held fixture'}};
  const article=encoded(seo2.generateArticleSchema(input));
  for(const field of ['wordCount','datePublished','dateModified','author','isAccessibleForFree'])assert.equal(article[field],undefined);
  const product=encoded(seo2.generateProductSchema(input));
  assert.equal(product.url,input.url);assert.equal(product.offers,undefined);assert.equal(product.aggregateRating,undefined);
  const service=encoded(config.generateServiceSchema(input));
  assert.equal(service.areaServed,undefined);assert.equal(service.provider['@id'],config.generateOrganizationSchema()['@id']);
  assert.equal(seo2.generateAuthorSchema({name:'Approved fixture',publicUse:'approved'}).worksFor,undefined);
});

test('metadata requires explicit author approval, uses supported article dates and emits no social affiliation default', () => {
  const input={title:'Fixture',description:'Fixture',path:'/fixture',author:'Held fixture',publishedTime:'2026-02-30',modifiedTime:'bad'};
  const result=config.generatePageMetadata({...input,type:'article'});
  assert.deepEqual(result.authors,[]);assert.equal(result.openGraph.publishedTime,undefined);assert.equal(result.openGraph.modifiedTime,undefined);
  assert.equal(result.twitter.site,undefined);assert.equal(result.twitter.creator,undefined);
  assert.equal(result.alternates.canonical,'https://whats91.com/fixture');
  assert.deepEqual(config.generatePageMetadata({...input,authorPublicUse:'approved'}).authors,[{name:'Held fixture'}]);
});

test('all twelve real article graphs preserve registry dates and held attribution while linking stable brand entities', () => {
  const {getAllPosts}=load('src/lib/blog/registry.ts'),{generateBlogArticleSchema}=load('src/lib/blog/metadata.ts'),{contentDates}=load('src/lib/content/dates.ts');
  assert.equal(getAllPosts().length,12);
  for(const post of getAllPosts()){
    const schema=generateBlogArticleSchema(post.slug),dates=contentDates(post);
    assert.equal(schema.headline,post.title);assert.equal(schema.description,post.excerpt);
    assert.equal(schema.datePublished,dates.published);assert.equal(schema.dateModified,dates.modified);
    assert.equal(schema.author,undefined);assert.equal(schema.wordCount,undefined);
    assert.equal(schema.publisher['@id'],'https://whats91.com/#organization');
    assert.equal(schema['@id'],`https://whats91.com/blog/${post.slug}#article`);
  }
});

test('FAQ serialization uses supplied readable questions only and safely retains hostile text inside JSON', () => {
  const {FAQJsonLD}=load('src/components/seo/JsonLD.tsx');
  assert.equal(renderToStaticMarkup(createElement(FAQJsonLD,{faqs:[]})), '');
  const question='Fixture </script><script>bad()</script>',answer='Literal < character & answer';
  const html=renderToStaticMarkup(createElement(FAQJsonLD,{faqs:[{question,answer}]}));
  assert.equal((html.match(/<script/g)||[]).length,1);assert.ok(!html.includes('<script>bad'));
  const parsed=JSON.parse(html.match(/<script[^>]*>(.*?)<\/script>/s)[1]);
  assert.deepEqual(parsed.mainEntity.map(n=>[n.name,n.acceptedAnswer.text]),[[question,answer]]);
});

test('local readiness accepts the scoped website graph and real labelled numeric drafts, but rejects missing labels and quantities', async () => {
  const faq={'@context':'https://schema.org','@type':'FAQPage',mainEntity:[{'@type':'Question',name:'Fixture question?',acceptedAnswer:{'@type':'Answer',text:'Fixture answer.'}}]};
  const breadcrumb=config.generateBreadcrumbSchema([{name:'Home',url:'/'}]);
  const bootstrap='<script>self.__next_f.push([1,"0:{\\\"b\\\":\\\"fixture-build\\\",\\\"c\\\":[],\\\"f\\\":[]}\\n"])</script>';
  const script=value=>`<script type="application/ld+json">${JSON.stringify(value)}</script>`;
  const html=(schemas,body='')=>`<html><body><h1>Fixture</h1><h2>Fixture question?</h2><p>Fixture answer.</p>${body}${schemas.map(script).join('')}${bootstrap}</body></html>`;
  for(const [kind,valid] of [['text',true],['number',true],['missing-label',false],['missing-field',false]]){
    const inputs=['Marketing','Utility','Authentication','Service'].filter((_,i)=>kind!=='missing-field'||i!==3).map((name,i)=>`${kind==='missing-label'&&i===3?'':`<label for="field-${i}">${name}</label>`}<input id="field-${i}" type="${kind==='number'?'number':'text'}" inputmode="numeric">`).join('');
    const fetchImpl=async value=>{
      const path=new URL(value).pathname;
      if(path==='/sitemap.xml')return new Response(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/','/pricing','/tools/whatsapp-api-cost-calculator'].map(p=>`<url><loc>https://whats91.com${p}</loc></url>`).join('')}</urlset>`,{headers:{'content-type':'application/xml'}});
      if(path==='/llms.txt')return new Response('[Tool](https://whats91.com/tools/whatsapp-api-cost-calculator) [Guide](https://whats91.com/blog/whatsapp-cloud-api-pricing-india-2026)',{headers:{'content-type':'text/plain'}});
      const schemas=path==='/'?[config.generateOrganizationSchema(),config.generateWebSiteSchema(),{'@context':'https://schema.org','@type':'WebPage',name:'Fixture'},faq]:path==='/pricing'?[faq,breadcrumb]:[faq,breadcrumb,config.generateSoftwareApplicationSchema({name:'Fixture tool',description:'Fixture tool description',url:'https://whats91.com/tools/whatsapp-api-cost-calculator'})];
      return new Response(html(schemas,path.includes('/tools/')?inputs:''),{headers:{'content-type':'text/html'}});
    };
    const report=await validate({base:'http://127.0.0.1:4311',expected:'fixture-build',mode:'readiness',fetchImpl});
    assert.equal(report.rows.find(r=>r.check==='readiness-types'&&r.target==='/')?.status,'pass','No invented Service is required');
    assert.equal(report.rows.find(r=>r.check==='calculator-rendered-controls')?.status,valid?'pass':'fail',kind);
  }
});
