import { readFileSync, writeFileSync, existsSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entryPath = resolve(__dirname, 'entry.txt');
const outputPath = '/output/entry.txt';
const envOutputDir = process.env.MAKEFUN_OUTPUT_DIR;
const makefunOutputPath = envOutputDir ? resolve(envOutputDir, 'entry.txt') : null;

const text = readFileSync(entryPath, 'utf-8');

try {
  writeFileSync(outputPath, text, 'utf-8');
} catch {
  // output directory may not exist in all environments
}

if (makefunOutputPath && makefunOutputPath !== outputPath) {
  writeFileSync(makefunOutputPath, text, 'utf-8');
}