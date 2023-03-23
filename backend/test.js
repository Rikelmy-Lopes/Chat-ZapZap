const express = require('express');
const os = require('os');

const app = express();

// let ip;
// const networkInterfaces = os.networkInterfaces();
// const PORT = 3005;
// console.log(networkInterfaces);
// if (networkInterfaces.eth0) {
//   ip = networkInterfaces.eth0[0].address;
// } else {
//   ip = 'localhost';
// }


let ip;
const networkInterfaces = os.networkInterfaces();
const PORT = 3005;
console.log(networkInterfaces);
if (networkInterfaces.wlp1s0) {
  ip = networkInterfaces.wlp1s0[0].address;
} else {
  ip = 'localhost';
}


app.listen(Number(PORT), ip, () => console.log(`Running server Express on: http://${ip}:${PORT}`));
