const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.dat': 'application/octet-stream',
  '.dll': 'application/octet-stream',
  '.pdb': 'application/octet-stream',
  '.blat': 'application/octet-stream',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Set the required CORS headers as per README
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  
  // Handle favicon.ico
  if (req.url === '/favicon.ico') {
    req.url = '/app.ico';
  }
  
  // Handle root URL
  let filePath = req.url === '/' 
    ? path.join(__dirname, 'index.html')
    : path.join(__dirname, req.url);

  // Extract file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // Read file
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // Page not found
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 - File Not Found');
      } else {
        // Server error
        console.error(`Server error: ${error.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('IMPORTANT: Required CORS headers are being set:');
  console.log('Cross-Origin-Embedder-Policy: require-corp');
  console.log('Cross-Origin-Opener-Policy: same-origin');
});
