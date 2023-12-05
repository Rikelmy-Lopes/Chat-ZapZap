import app from './app';
import connectToDatabase from './database/NOSQL/config/connection';
import socket from './socket';
import { config } from './config/config';


const API_PORT = config.server.apiPort;
const SOCKET_PORT = config.server.socketPort;

connectToDatabase().then(()=> {
  socket.listen(SOCKET_PORT, () => console.log(`Running server SocketIo on: http://localhost:${SOCKET_PORT}`));
  app.listen(API_PORT, () => console.log(`Running server Express on: http://localhost:${API_PORT}`));

}).catch((error) => {
  console.log('Connection with database generated an error:\r\n');
  console.error(error);
  console.log('\r\nServer initialization cancelled');
  process.exit(0);
});

