import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
const identitySchema = z.object({ candidateId: z.string().regex(/^[a-f0-9]{64}$/), buildId: z.string().regex(/^\w[\w.-]{0,79}$/), version: z.string().max(80).regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/) }).strict();
export async function releaseReadiness() {
  const root=process.cwd(),filename=path.join(root,'release-identity.json');
  const stat=fs.lstatSync(filename);if (!stat.isFile() || stat.isSymbolicLink() || stat.size>1024) throw new Error('READINESS_UNAVAILABLE');
  const identity=identitySchema.parse(JSON.parse(fs.readFileSync(filename,'utf8')));
  if (fs.readFileSync(path.join(root,'.next/BUILD_ID'),'utf8').trim()!==identity.buildId || fs.readFileSync(path.join(root,'version.txt'),'utf8').trim()!==identity.version) throw new Error('READINESS_UNAVAILABLE');
  return { status: 'ready', scope: 'website', ...identity };
}
