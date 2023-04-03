import app from './app';
import os from 'os';
import 'dotenv/config';
import http from 'http';
import { Server, Socket } from 'socket.io';
const serverSocketIo = http.createServer();
import socketChat from './Socket/SocketChat';
import socketMessage from './Socket/SocketMessage';
import connectToDatabase from './database/NOSQL/config/connection';
const io = new Server(serverSocketIo, {
  cors: {
    origin: '*'
  }
});

let ip: string;
const networkInterfaces = os.networkInterfaces();
const PORT = process.env.PORT || 3001;
if (networkInterfaces.wlp1s0) {
  ip = networkInterfaces.wlp1s0[0].address;
} else {
  ip = 'localhost';
}

io.on('connection', (socket: Socket) => {
  console.log('\x1b[32m%s\x1b[0m', `Socket conectado: ${socket.id} `);
  
  socketChat(socket);

  socketMessage(socket, io);

  socket.on('disconnect', () => {
    console.log('\x1b[31m%s\x1b[0m', `Usuário desconectado: ${socket.id} `);
  });
});

connectToDatabase().then(()=> {
  serverSocketIo.listen(4000, () => console.log(`Running server SocketIo on: http://${ip}:${4000}`));
  app.listen(Number(PORT), () => console.log(`Running server Express on: http://${ip}:${PORT}`));

}).catch((error) => {
  console.log('Connection with database generated an error:\r\n');
  console.error(error);
  console.log('\r\nServer initialization cancelled');
  process.exit(0);
});

