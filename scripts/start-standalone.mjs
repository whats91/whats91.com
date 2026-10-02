import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyNamedReleaseDirectory, verifyPackage } from './release-contract/candidate.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
try {
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'release-manifest.json'),'utf8'));
 verifyNamedReleaseDirectory(root,manifest);
 verifyPackage(root,manifest);process.chdir(root);
 await import('./server.js');
} catch {console.error('Website startup unavailable: candidate verification failed.');process.exit(1);}
