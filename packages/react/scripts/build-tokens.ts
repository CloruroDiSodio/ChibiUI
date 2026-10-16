import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { generateTokensCss } from './tokens-css';

const target = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url));
writeFileSync(target, generateTokensCss());
console.log(`✿ tokens written to ${target}`);
