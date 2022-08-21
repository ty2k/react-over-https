require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const https = require('https');

const key = fs.readFileSync(path.join(__dirname, './keytmp.pem'), 'utf-8');
const cert = fs.readFileSync(path.join(__dirname, './cert.pem'), 'utf-8');
const PASSPHRASE = process.env.PASSPHRASE;

const app = express();

// Middleware to upgrade http connections to https
app.use((req, res, next) => {
  req.secure
    ? next()
    : res.redirect(
        'https://' + req.headers.host.replace('8080', '8443') + req.url
      );
});

// Serve the built React front-end
app.use(express.static(path.join(__dirname, 'public')));

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  { key: key, cert: cert, passphrase: PASSPHRASE },
  app
);

httpServer.listen(8080, () => {
  console.log('http server listening on 8080');
});

httpsServer.listen(8443, () => {
  console.log('https server listening on 8443');
});
