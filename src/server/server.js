const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;
const app = express();
const config = require('./config');

app.use(cookieParser());

const adminAPIProxySettings = {
  target:
    process.env.AGENT_ADMIN_API_URL !== undefined ? process.env.AGENT_ADMIN_API_URL : 'https://api.dev.gccservice.in',
  changeOrigin: true,
  ws: true,
  secure: false,
  headers: { Authorization: process.env.AUTH_HEADER },

  onProxyReq: function onProxyReq(proxyReq, req, res) {
    if (req.method === 'POST') {
      if (req.body) {
        let bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.write(bodyData);
      }
    }
  },
};

const HQIMSAPIProxySettings = {
  target: process.env.HQIMS_API_URL !== undefined ? process.env.HQIMS_API_URL : 'https://focusdev.gccservice.in',
  changeOrigin: true,
  ws: true,
  secure: false,
  headers: { Authorization: process.env.HQIMS_AUTH_HEADER },

  onProxyReq: function onProxyReq(proxyReq, req, res) {
    if (req.method === 'POST') {
      if (req.body) {
        let bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.write(bodyData);
      }
    }
  },
};

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(express.static(path.join('build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/dashboard', function(req, res) {
  if (req.cookies['csr-api-be'] !== undefined && req.cookies['csr-api-be'].length > 0) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  } else {
    res.redirect('/');
  }
});

app.get('/hotzones', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/containmentzones', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/testingCenters', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/healthCenters', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.get('/api/config', (req, res) => {
  res.send(config);
});

app.use(createProxyMiddleware(['/api/csr/**'], adminAPIProxySettings));
app.use(createProxyMiddleware(['/api/v2/csr/**'], adminAPIProxySettings));
app.use(createProxyMiddleware(['/api/admin/**'], HQIMSAPIProxySettings));

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  }
  console.info(`==> 🌎 App Listening on ${PORT} please open your browser and navigate to http://localhost:${PORT}/`);
});
