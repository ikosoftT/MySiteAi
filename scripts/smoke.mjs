import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import net from 'node:net';
import assert from 'node:assert/strict';

async function freePort(){return new Promise((resolve,reject)=>{const server=net.createServer();server.once('error',reject);server.listen(0,'127.0.0.1',()=>{const port=server.address().port;server.close(()=>resolve(port))})})}
const port=await freePort();
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','-p',String(port)],{stdio:'ignore'});
let browser;
try{
 let ready=false;for(let i=0;i<60;i++){try{const r=await fetch(`http://127.0.0.1:${port}/`);if(r.ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,250))}
 assert(ready,'Production server did not start');
 browser=await chromium.launch({headless:true});
 for(const width of [320,375,430,768,1024,1440,1920]){
  const context=await browser.newContext({viewport:{width,height:900}});
  const page=await context.newPage();
  for(const route of ['/','/projects','/academy','/about','/ikosoft','/contact','/projects/elite-1337','/academy/course-ljmnu3zqsqck','/academy/course-ljmnu3zqsqck/6-oMohNK5EA']){
   const response=await page.goto(`http://127.0.0.1:${port}${route}`,{waitUntil:'domcontentloaded'});
   assert.equal(response.status(),200,`${route} returned ${response.status()}`);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   assert(overflow<=1,`${route} overflows at ${width}px by ${overflow}px`);
  }
  if(width===320){await page.goto(`http://127.0.0.1:${port}/`);await page.getByRole('button',{name:'Open menu'}).click();assert(await page.getByRole('dialog',{name:'Navigation menu'}).isVisible());await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog',{name:'Navigation menu'}).count(),0)}
  if(width===1440){await page.goto(`http://127.0.0.1:${port}/projects`);await page.getByPlaceholder('Search projects or technologies').fill('Codexion');assert.equal(await page.locator('.project-card').count(),1);await page.getByRole('button',{name:'Algorithms'}).click();assert(await page.getByText('No matching featured projects').isVisible());await page.goto(`http://127.0.0.1:${port}/academy/course-ljmnu3zqsqck/6-oMohNK5EA`);assert((await page.locator('iframe').getAttribute('src')).includes('youtube-nocookie.com'));await page.getByRole('button',{name:'Mark lesson complete'}).click();await page.reload();assert(await page.getByRole('button',{name:'✓ Completed'}).isVisible())}
  await context.close();
 }
 console.log('Smoke checks passed: routes, seven viewport widths, menu, search, lesson player, local progress.');
}finally{await browser?.close();server.kill('SIGTERM')}
