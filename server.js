const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (you can restrict this to specific domains)
app.use(cors());

// Set security headers to allow iframe embedding
app.use((req, res, next) => {
  // Option 1: Allow all domains to embed (less secure but works everywhere)
  // res.setHeader('X-Frame-Options', 'ALLOWALL');
  
  // Option 2: Allow same origin and specific domains (recommended)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Content Security Policy to allow iframe embedding
  // You can add specific domains instead of '*' for better security
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' *");
  
  // Additional security headers that don't affect iframe embedding
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Handle all routes by serving index.html (for single-page app behavior)
app.get('*', (req, res) => {
  // Check if the request is for a specific file
  const requestedFile = req.path.slice(1); // Remove leading slash
  
  // If it's a specific HTML file that exists, serve it
  if (requestedFile && requestedFile.endsWith('.html')) {
    res.sendFile(path.join(__dirname, requestedFile), (err) => {
      if (err) {
        // If file doesn't exist, serve index.html
        res.sendFile(path.join(__dirname, 'index.html'));
      }
    });
  } else if (!requestedFile || requestedFile === '') {
    // Root path, serve index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Micro Giant website server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the website`);
  console.log(`\nIframe embedding is ENABLED with the following settings:`);
  console.log(`- X-Frame-Options: SAMEORIGIN`);
  console.log(`- Content-Security-Policy: frame-ancestors 'self' *`);
  console.log(`\nThis allows the website to be embedded in iframes from any domain.`);
});