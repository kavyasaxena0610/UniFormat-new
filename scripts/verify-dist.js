import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

const templates = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'templates.json'), 'utf8'));

console.log(`Verifying ${templates.length} templates in JSON...`);

let errors = 0;

for (const t of templates) {
  const publicPdf = path.join(root, 'public', t.downloadPdfPath.replace(/^\//, ''));
  const publicDocx = path.join(root, 'public', t.downloadDocxPath.replace(/^\//, ''));
  const distPdf = path.join(root, 'dist', t.downloadPdfPath.replace(/^\//, ''));
  const distDocx = path.join(root, 'dist', t.downloadDocxPath.replace(/^\//, ''));

  if (!fs.existsSync(publicPdf)) {
    console.error(`Missing public PDF: ${t.downloadPdfPath}`);
    errors++;
  }
  if (!fs.existsSync(publicDocx)) {
    console.error(`Missing public DOCX: ${t.downloadDocxPath}`);
    errors++;
  }
  if (!fs.existsSync(distPdf)) {
    console.error(`Missing dist PDF: ${t.downloadPdfPath}`);
    errors++;
  }
  if (!fs.existsSync(distDocx)) {
    console.error(`Missing dist DOCX: ${t.downloadDocxPath}`);
    errors++;
  }
}

if (errors === 0) {
  console.log(`SUCCESS: All ${templates.length * 2} PDF and DOCX files verified in both public/ and dist/!`);
} else {
  console.error(`FAILED: ${errors} missing files!`);
  process.exit(1);
}

