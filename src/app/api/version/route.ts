import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read version.txt from project root
    // In development, we're at project root
    // In production (standalone), we need to go up from .next/standalone
    const possiblePaths = [
      path.join(process.cwd(), 'version.txt'),
      path.join(process.cwd(), '..', '..', 'version.txt'),
      path.join(process.cwd(), '../../version.txt'),
    ];

    let versionFilePath: string | null = null;
    
    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        versionFilePath = p;
        break;
      }
    }

    if (!versionFilePath) {
      // Fallback: try to find it by walking up
      let currentDir = process.cwd();
      for (let i = 0; i < 5; i++) {
        const testPath = path.join(currentDir, 'version.txt');
        if (fs.existsSync(testPath)) {
          versionFilePath = testPath;
          break;
        }
        currentDir = path.dirname(currentDir);
      }
    }

    if (!versionFilePath) {
      return NextResponse.json({ version: '0.0.0', error: 'version.txt not found' });
    }

    const version = fs.readFileSync(versionFilePath, 'utf-8').trim();
    return NextResponse.json({ version });
  } catch (error) {
    console.error('Error reading version:', error);
    return NextResponse.json({ version: '0.0.0', error: 'Failed to read version' });
  }
}
