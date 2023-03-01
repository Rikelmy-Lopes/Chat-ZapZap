import app from './app';
import os from 'os';
import 'dotenv/config';

let ip : string;
const networkInterfaces = os.networkInterfaces();
const PORT = process.env.PORT || 3001;
if (networkInterfaces.wlp1s0) {
  ip = networkInterfaces.wlp1s0[0].address;
} else {
  ip = 'localhost';
}


export {
  app,
  PORT,
  ip,
};