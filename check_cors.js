
const https = require('https');

const options = {
  method: 'OPTIONS',
  headers: {
    'Origin': 'https://storied-brigadeiros-76e5b9.netlify.app',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'content-type'
  }
};

console.log("Checking CORS for https://real-estate-app-h0om.onrender.com/api/payment/verify");

const req = https.request('https://real-estate-app-h0om.onrender.com/api/payment/verify', options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Access-Control-Allow-Origin:', res.headers['access-control-allow-origin']);
  console.log('Access-Control-Allow-Methods:', res.headers['access-control-allow-methods']);
  console.log('Access-Control-Allow-Headers:', res.headers['access-control-allow-headers']);
});

req.on('error', (e) => {
  console.error("Error:", e.message);
});

req.end();
