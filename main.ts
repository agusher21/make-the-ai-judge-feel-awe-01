import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const entryPath = resolve(__dirname, 'entry.txt');
const text = readFileSync(entryPath, 'utf-8');
const sourceBytes = Buffer.from(text, 'utf-8');

const envOutputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (envOutputDir) {
  const makefunOutputPath = resolve(envOutputDir, 'entry.txt');
  writeFileSync(makefunOutputPath, text, 'utf-8');
  const written = readFileSync(makefunOutputPath);
  if (!written.equals(sourceBytes)) {
    console.error('Self-check failed: MAKEFUN_OUTPUT_DIR/entry.txt bytes mismatch');
    process.exit(1);
  }
}

try {
  const outputPath = '/output/entry.txt';
  writeFileSync(outputPath, text, 'utf-8');
  const written = readFileSync(outputPath);
  if (!written.equals(sourceBytes)) {
    console.error('Self-check failed: /output/entry.txt bytes mismatch');
    process.exit(1);
  }
} catch {
  // output directory may not exist in all environments
}