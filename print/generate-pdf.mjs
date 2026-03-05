/**
 * JVS Broschüre — PDF Generator
 * 
 * Verwendung:
 *   node print/generate-pdf.mjs
 *   node print/generate-pdf.mjs --output custom-name.pdf
 *   node print/generate-pdf.mjs --template print/broschuere-jvs.html
 */

import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback;
};

const templateFile = getArg('--template', 'print/broschuere-jvs.html');
const outputFile = getArg('--output', 'print/output/JVS-Broschuere.pdf');

const projectRoot = resolve(__dirname, '..');
const templatePath = resolve(projectRoot, templateFile);
const outputPath = resolve(projectRoot, outputFile);

async function generatePDF() {
  console.log(`\n📄 JVS PDF Generator`);
  console.log(`   Template: ${templateFile}`);
  console.log(`   Output:   ${outputFile}\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.goto(`file://${templatePath}`, {
    waitUntil: 'networkidle0',
    timeout: 30000,
  });

  await page.waitForFunction(() => {
    return document.fonts.ready.then(() => true);
  }, { timeout: 10000 });

  await new Promise(r => setTimeout(r, 1000));

  const { mkdirSync } = await import('fs');
  mkdirSync(dirname(outputPath), { recursive: true });

  await page.pdf({
    path: outputPath,
    width: '210mm',
    height: '297mm',
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`   ✅ PDF erstellt: ${outputFile}`);
  console.log(`   📐 Format: A4 (210×297mm)`);
  console.log(`   📄 Seiten: 3\n`);

  await browser.close();
}

generatePDF().catch((err) => {
  console.error('❌ Fehler:', err.message);
  process.exit(1);
});
