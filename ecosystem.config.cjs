const path = require('path');
const fs = require('fs');

// Load .env from project root (where the actual .env file is)
const envPath = path.join(__dirname, '.env');
const env = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      }
    }
  });
}

/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: 'whats91',
      script: 'server.js',
      cwd: path.join(__dirname, '.next', 'standalone'),
      interpreter: 'node',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        ...env, // Spread all .env variables from root
      },
      // Log configuration
      error_file: path.join(__dirname, 'logs', 'error.log'),
      out_file: path.join(__dirname, 'logs', 'out.log'),
      log_file: path.join(__dirname, 'logs', 'combined.log'),
      time: true,
    },
  ],
};
