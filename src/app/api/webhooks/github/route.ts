import { spawn } from "node:child_process";
import { NextResponse } from "next/server";
import { join } from "node:path";
import { existsSync, openSync, writeFileSync, closeSync, unlinkSync } from "node:fs";

export const runtime = "nodejs";

// Branch to listen for deployments
const DEPLOY_BRANCH = process.env.GITHUB_WEBHOOK_BRANCH || "main";

/**
 * Extract payload from GitHub webhook request
 * GitHub sends URL-encoded form data, not raw JSON
 */
async function extractPayload(request: Request): Promise<{
  branch?: string;
  ref?: string;
  repository?: string;
  pushed_at?: number;
} | null> {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      const payloadStr = formData.get("payload");
      if (payloadStr && typeof payloadStr === "string") {
        return JSON.parse(payloadStr);
      }
    } else if (contentType.includes("application/json")) {
      return await request.json();
    }
    
    return null;
  } catch (err) {
    console.error("[github-webhook] Error extracting payload:", err);
    return null;
  }
}

/**
 * Trigger the deployment script using a completely detached process
 * This ensures no environment pollution from the parent Next.js process
 */
function triggerDeployment(projectPath: string): void {
  console.log("[github-webhook] Triggering deployment script...");
  console.log(`[github-webhook] Project path: ${projectPath}`);
  console.log(`[github-webhook] Current working directory: ${process.cwd()}`);
  
  // Use ABSOLUTE path to the deploy script
  const deployScript = join(projectPath, "scripts", "deploy.js");
  
  // Check if deploy script exists
  if (!existsSync(deployScript)) {
    console.error(`[github-webhook] Deploy script not found: ${deployScript}`);
    return;
  }
  
  console.log(`[github-webhook] Deploy script: ${deployScript}`);
  
  // Create a wrapper script that will run in a clean environment
  const wrapperScript = join(projectPath, "scripts", "deploy-trigger.sh");
  const logFile = join(projectPath, "deploy.log");
  
  // Write a wrapper script that sets up a clean environment
  const wrapperContent = `#!/bin/bash
# Deployment trigger wrapper
# This runs in a clean shell environment

cd "${projectPath}"
export GITHUB_WEBHOOK_PROJECT_PATH="${projectPath}"
export HOME="${process.env.HOME}"
export USER="${process.env.USER}"
export PATH="${process.env.PATH}"

# Run the deploy script
node "${deployScript}" >> "${logFile}" 2>&1
`;
  
  try {
    writeFileSync(wrapperScript, wrapperContent, { mode: 0o755 });
    console.log(`[github-webhook] Created wrapper script: ${wrapperScript}`);
  } catch (err) {
    console.error(`[github-webhook] Failed to create wrapper script:`, err);
    return;
  }
  
  // Use spawn with completely detached process
  // This runs in a completely separate process group
  const child = spawn("/bin/bash", [wrapperScript], {
    detached: true,        // Completely detach from parent
    stdio: "ignore",       // Ignore all stdio
    cwd: projectPath,
    env: {
      // Clean minimal environment
      HOME: process.env.HOME,
      USER: process.env.USER,
      PATH: process.env.PATH,
      GITHUB_WEBHOOK_PROJECT_PATH: projectPath,
    },
  });
  
  // Completely unref so parent can exit without waiting
  child.unref();
  
  child.on("error", (err) => {
    console.error(`[github-webhook] Spawn error: ${err.message}`);
  });
  
  console.log(`[github-webhook] Deploy process spawned with PID: ${child.pid}`);
  console.log(`[github-webhook] Logs will be written to: ${logFile}`);
}

/**
 * POST handler - Triggers deployment on push to configured branch
 */
export async function POST(request: Request) {
  console.log("[github-webhook] Received webhook request");
  
  // Extract payload to check branch
  const payload = await extractPayload(request);
  
  if (payload) {
    const ref = payload.ref || "";
    const branch = ref.replace("refs/heads/", "");
    
    console.log(`[github-webhook] Push to branch: ${branch}`);
    console.log(`[github-webhook] Configured deploy branch: ${DEPLOY_BRANCH}`);
    
    // Only deploy for the configured branch
    if (branch !== DEPLOY_BRANCH) {
      console.log(`[github-webhook] Skipping deployment - branch '${branch}' does not match '${DEPLOY_BRANCH}'`);
      return NextResponse.json({
        ok: true,
        message: `Skipped deployment - branch '${branch}' does not match configured branch '${DEPLOY_BRANCH}'`,
        branch,
        configuredBranch: DEPLOY_BRANCH,
      });
    }
  } else {
    console.log("[github-webhook] Could not extract payload, proceeding with deployment anyway");
  }
  
  const projectPath = process.env.GITHUB_WEBHOOK_PROJECT_PATH ?? "/home/whats91/htdocs/whats91.com";
  
  // Trigger the deployment script
  triggerDeployment(projectPath);
  
  // Return immediately - deployment runs in background
  return NextResponse.json({
    ok: true,
    message: "Deployment triggered successfully",
    projectPath,
    branch: DEPLOY_BRANCH,
    note: "Deployment script running in background. Check deploy.log for progress.",
  });
}

/**
 * GET handler - Health check
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "GitHub webhook endpoint is active",
    timestamp: new Date().toISOString(),
    projectPath: process.env.GITHUB_WEBHOOK_PROJECT_PATH ?? "/home/whats91/htdocs/whats91.com",
  });
}
