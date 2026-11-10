// Minifies src/css/main.css -> assets/css/main.min.css
//          src/js/main.js   -> assets/js/main.min.js
// Usage:  cd tools && npm install && npm run minify
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const r = (p) => path.join(root, p);

await build({
  entryPoints: [r('src/css/main.css')],
  outfile: r('assets/css/main.min.css'),
  minify: true,
  logLevel: 'info',
  target: ['chrome90', 'safari14', 'firefox90'],
});

await build({
  entryPoints: [r('src/js/main.js')],
  outfile: r('assets/js/main.min.js'),
  minify: true,
  logLevel: 'info',
  target: ['es2017'],
});
