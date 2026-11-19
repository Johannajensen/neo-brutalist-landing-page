import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outDir = path.resolve(__dirname, '../docs/screenshots');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Navigating to http://127.0.0.1:5174/ ...');
  await page.goto('http://127.0.0.1:5174/', { waitUntil: 'networkidle0', timeout: 30000 });
  await page.waitForTimeout ? page.waitForTimeout(1500) : new Promise(r => setTimeout(r, 1500));

  // 1. 首屏截图
  console.log('Capturing hero...');
  await page.screenshot({ path: path.join(outDir, '01-hero-preview.png') });

  // 2. 滚动到 features 视差模块
  console.log('Capturing features...');
  await page.evaluate(() => {
    document.querySelector('#features')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '02-features-preview.png') });

  // 3. 滚动到 showcase
  console.log('Capturing showcase...');
  await page.evaluate(() => {
    document.querySelector('#showcase')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '03-showcase-preview.png') });

  // 4. 滚动到 3D 实验室
  console.log('Capturing playground...');
  await page.evaluate(() => {
    document.querySelector('#playground')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '04-playground-preview.png') });

  // 5. 滚动到底部预售区与作者联系
  console.log('Capturing preorder & author...');
  await page.evaluate(() => {
    document.querySelector('#preorder')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, '05-preorder-author.png') });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

run().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
