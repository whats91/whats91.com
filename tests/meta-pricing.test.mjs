import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { projectLoader } from './helpers/load-project-module.mjs';
const mocks = new Map();
const load = projectLoader(mocks);
const p = load('src/lib/meta-pricing.ts');
const zero = { marketing: 0, utility: 0, authentication: 0, service: 0 };
const base = { market: 'IN', currency: 'INR', date: '2026-10-01', volumes: zero, freeEntry: zero, serviceAllowanceRemaining: 1000, priorUtility: 0, priorAuthentication: 0, authenticationMode: 'domestic', internationalEligible: false };
const estimate = (changes = {}) => p.estimateScheduledMetaCost({ ...base, ...changes });
const money = units => Math.round(units / 100) / 100;

test('all 47 market rates and tiers match the independent official-workbook extraction', () => {
 const source = JSON.parse(readFileSync('docs/evidence/meta-pricing-2026-10-01/source-extraction.json', 'utf8'));
 assert.deepEqual(p.metaPricingSchedule.markets, source.markets);
 assert.equal(p.metaPricingSchedule.markets.length, 47);
 assert.equal(new Set(p.metaPricingSchedule.markets.map(m => m.id)).size, 47);
 assert.equal(p.metaPricingSchedule.provenance.listRates.sha256, source.provenance.ratesSha256);
 assert.equal(p.metaPricingSchedule.provenance.volumeTiers.sha256, source.provenance.tiersSha256);
 assert.equal(p.metaPricingSchedule.markets.filter(m => m.rates.authenticationInternational !== null).length, 18);
 assert.deepEqual(p.getMetaMarket('IN').rates, { marketing: .8631, utility: .115, authentication: .115, authenticationInternational: 2.4971, service: .115 });
 assert.equal(p.formatMetaRate(null), 'N/A'); assert.equal(p.formatMetaRate(.115), '₹0.1150');
});

test('future effective period, currency, market and malformed inputs fail closed', () => {
 for (const changes of [{date:'2026-09-30'}, {date:'2026-02-30'}, {date:''}, {date:'2026-13-01'}, {currency:'USD'}, {market:'unknown'}, {authenticationMode:'bad'}, {serviceAllowanceRemaining:1001}, {priorUtility:''}, {priorAuthentication:-1}]) assert.equal(estimate(changes).status, 'unavailable');
 for (const value of ['', 'NaN', NaN, Infinity, -1, 1.1, '1e3', 1000000001, null]) {
  assert.equal(estimate({volumes:{...zero,marketing:value}}).status,'unavailable');
  assert.equal(estimate({freeEntry:{...zero,service:value}}).status,'unavailable');
 }
 assert.equal(estimate({date:'2026-10-01'}).meta,0);
 assert.equal(estimate({date:'2026-11-01'}).meta,0);
});

test('Service 999/1000/1001 boundary, consumed allowance and recipient-count semantics', () => {
 for (const [service,expected] of [[999,0],[1000,0],[1001,.12],[2000,115]]) assert.equal(estimate({volumes:{...zero,service}}).meta,expected);
 assert.equal(estimate({volumes:{...zero,service:1},serviceAllowanceRemaining:0}).meta,.12);
 assert.equal(estimate({volumes:{...zero,service:100},serviceAllowanceRemaining:10}).meta,10.35);
 assert.equal(estimate({volumes:{...zero,service:2000}}).serviceFree,1000);
 assert.equal(estimate({volumes:{...zero,service:2000},serviceAllowanceRemaining:0}).billable.service,2000);
 // Counts are deliveries/recipients: a group send to 1,001 delivered recipients uses 1,001 units.
 assert.equal(estimate({volumes:{...zero,service:1001}}).billable.service,1);
});

test('eligible free-entry counts are excluded once, never advance paid tiers, and cannot exceed volume', () => {
 const volumes={marketing:100,utility:200,authentication:300,service:1500};
 assert.equal(estimate({volumes,freeEntry:volumes}).meta,0);
 assert.equal(estimate({volumes,freeEntry:{...zero,utility:201}}).status,'unavailable');
 const value=estimate({volumes:{...zero,utility:2},freeEntry:{...zero,utility:1},priorUtility:25000000});
 assert.equal(value.billable.utility,1);assert.equal(value.meta,.11);
 assert.equal(estimate({volumes:{...zero,service:1500},freeEntry:{...zero,service:500}}).meta,0);
 assert.equal(estimate({volumes:{...zero,service:1500},freeEntry:{...zero,service:500},serviceAllowanceRemaining:0}).meta,115);
});

test('international eligibility/N/A fail closed and shared prior Authentication counts select the marginal tier', () => {
 const volumes={...zero,authentication:100};
 assert.equal(estimate({volumes,authenticationMode:'international'}).status,'unavailable');
 assert.equal(estimate({volumes,authenticationMode:'international',internationalEligible:true}).meta,249.71);
 assert.equal(estimate({volumes,market:'france',authenticationMode:'international',internationalEligible:true}).status,'unavailable');
 assert.equal(estimate({volumes:{...zero,authentication:1},authenticationMode:'international',internationalEligible:true,priorAuthentication:750000}).meta,2.35);
 assert.equal(estimate({volumes:{...zero,authentication:1},priorAuthentication:750000}).meta,.11);
 // No international paid deliveries means no invented charge even for an N/A market.
 assert.equal(estimate({market:'france',authenticationMode:'international'}).meta,0);
});

test('official tier-minus/at/plus edges for every supported market/category are marginal, including prior-volume offsets', () => {
 for(const market of p.metaPricingSchedule.markets) for(const category of ['utility','authentication','authenticationInternational']) {
  const tiers=market.tiers[category];if(!tiers.length)continue;
  let accruedUnits=0,previous=0;
  const inputCategory=category==='utility'?'utility':'authentication';
  for(let i=0;i<tiers.length-1;i++) {
   const boundary=tiers[i].upTo,rate=Math.round(tiers[i].rate*10000),next=Math.round(tiers[i+1].rate*10000);
   accruedUnits+=(boundary-previous)*rate;
   for(const delta of [-1,0,1]) {
    const value=estimate({market:market.id,authenticationMode:category==='authenticationInternational'?'international':'domestic',internationalEligible:true,volumes:{...zero,[inputCategory]:boundary+delta}});
    assert.equal(value.meta,money(accruedUnits+(delta<0?-rate:delta*next)),`${market.name}/${category}/${boundary+delta}`);
   }
   const value=estimate({market:market.id,authenticationMode:category==='authenticationInternational'?'international':'domestic',internationalEligible:true,volumes:{...zero,[inputCategory]:2},[category==='utility'?'priorUtility':'priorAuthentication']:boundary-1});
   assert.equal(value.meta,money(rate+next));previous=boundary;
  }
 }
});

test('no aggregate discounts, exact source precision and independent platform/tax/total', () => {
 const small=estimate({volumes:{...zero,utility:10,authentication:10}});
 const large=estimate({volumes:{marketing:1000000000,utility:10,authentication:10,service:1000000000}});
 assert.equal(large.categories.utility,small.categories.utility);assert.equal(large.categories.authentication,small.categories.authentication);
 assert.equal(estimate({volumes:{marketing:1000,utility:1000,authentication:0,service:0}}).meta,978.10);
 assert.equal(estimate({volumes:{marketing:1,utility:1,authentication:1,service:1},serviceAllowanceRemaining:0}).meta,1.21);
 assert.equal(p.metaPricingSchedule.markup,0);
 for(const field of ['platform','tax','total'])assert.equal(large[field],null);
});

test('SSR calculator and canonical pricing/home/guide twins use the same dated rates and policies', () => {
 const transform=(filename,source)=>ts.transpileModule(source,{fileName:filename,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const uiLoad=projectLoader(new Map(),transform);
 const renderLoad=projectLoader(new Map([["@/components/ui/input",uiLoad("src/components/ui/input.tsx")],["@/components/ui/label",uiLoad("src/components/ui/label.tsx")]]),transform);
 const html=renderToStaticMarkup(createElement(renderLoad('src/components/shared/MessageBudget.tsx').MessageBudget));
 assert.ok(html.includes('₹978.10')&&html.includes('₹0.8631')&&html.includes('₹2.4971')&&html.includes('Effective 1 October 2026'));
 assert.ok(html.includes('Without')||html.includes('without markup'));
 assert.ok(html.includes('<noscript>')&&html.includes('N/A')&&html.includes('1,000'));
 assert.ok(!/Rates not confirmed|Rate availability by market|Monetary estimate unavailable/.test(html));
 const pricing=load('src/lib/pricing.ts'),home=load('src/lib/home-content.ts');
 for(const market of p.metaPricingSchedule.markets)for(const category of p.metaCategories)assert.ok(pricing.pricingMarkdown.includes(p.formatMetaRate(market.rates[category])));
 for(const policy of [p.servicePricingPolicy,p.utilityPricingPolicy,p.freeEntryPricingPolicy,p.tierPricingPolicy,p.internationalPricingPolicy,p.noMarkupPolicy])assert.ok(pricing.pricingMarkdown.includes(policy));
 assert.ok(home.homeMarkdown.includes(home.homeMetaScenario));
 const {indiaPricingGuide}=load('src/lib/blog/billing-guides.ts');const {guideMarkdown}=load('src/lib/blog/erp-guides.ts');
 assert.ok(guideMarkdown(indiaPricingGuide).includes('₹0.8631'));
 assert.ok(guideMarkdown(indiaPricingGuide).includes(p.noMarkupPolicy));
 // Actual public JSON and Markdown routes, capability-free and no browser reloads.
 mocks.set("@/lib/blog",load("src/lib/blog/registry.ts"));
 const {GET:jsonGet}=load('src/app/api/mcp/pages/[slug]/route.ts');
 const {GET:mdGet}=load('src/app/api/md/[slug]/route.ts');
 return Promise.all(['pricing','whatsapp-api-cost-calculator','home','tools','blog-whatsapp-cloud-api-pricing-india-2026'].map(async slug=>{
  const req=new Request(`https://whats91.com/api/mcp/pages/${slug}`),context={params:Promise.resolve({slug})};
  const [json,md]=await Promise.all([jsonGet(req,context),mdGet(req,context)]);assert.equal(json.status,200);assert.equal(md.status,200);
  const body=await json.json(),markdown=await md.text();
  assert.ok(JSON.stringify(body).includes('1 October 2026'));assert.ok(markdown.includes('1 October 2026'));
  if(slug==='pricing') { assert.ok(JSON.stringify(body).includes('₹0.8631')); assert.ok(markdown.includes(p.freeEntryPricingPolicy)); }
 }));
});
