const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');

const PORT = process.env.PORT || 8000;
const app = express();

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
  console.log('called');
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.use(proxy(['/api/csr/**'], adminAPIProxySettings));

app.listen(PORT, error => {
  if (error) {
    console.error(error);
  }
  console.info(`==> 🌎 App Listening on ${PORT} please open your browser and navigate to http://localhost:${PORT}/`);
});
