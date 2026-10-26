// Generates 2000 independent app modules in src/ (gitignored).
import { writeFileSync } from 'node:fs';

for (let i = 0; i < 2000; i++) {
  writeFileSync(
    `src/m${i}.ts`,
    `export interface Shape${i} { id: number; name: string; tags: string[]; nested: { a: number; b: string; c: boolean[] } }
export function make${i}(id: number): Shape${i} {
  return { id, name: String(id), tags: [String(id)], nested: { a: id, b: String(id), c: [id > 0] } };
}
`,
  );
}
