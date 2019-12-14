const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cookieParser());

const adminAPIProxySettings = {
  target: process.env.AGENT_ADMIN_API_URL || 'http://52.66.148.41:3010',
  changeOrigin: true,
  ws: true,
  secure: false,

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

app.get('/home', function(req, res) {
  if(req.cookies['csr-api-be'] !== undefined && req.cookies['csr-api-be'].length > 0) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  }
  else {
    res.redirect('/');
  }
});

app.use(proxy(['/api/csr/**'], adminAPIProxySettings));

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  }
  console.info(`==> 🌎 App Listening on ${PORT} please open your browser and navigate to http://localhost:${PORT}/`);
});
