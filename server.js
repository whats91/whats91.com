/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
const port = Number(process.env.PORT || 3088);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res);
    });

    server.listen(port, hostname, () => {
      console.log(`> Server ready on http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start Next.js server:', error);
    process.exit(1);
  });