import 'dotenv/config';
import app from './app';
import connectToDatabase from './database/NOSQL/config/connection';
import socket from './socket';

const API_PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 3001;
const SOCKET_PORT = process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 4000;

connectToDatabase().then(()=> {
  socket.listen(SOCKET_PORT, () => console.log(`Running server SocketIo on: http://localhost:${SOCKET_PORT}`));
  app.listen(API_PORT, () => console.log(`Running server Express on: http://localhost:${API_PORT}`));

}).catch((error) => {
  console.log('Connection with database generated an error:\r\n');
  console.error(error);
  console.log('\r\nServer initialization cancelled');
  process.exit(0);
});

