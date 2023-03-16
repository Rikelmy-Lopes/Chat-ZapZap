import app from './app';
import os from 'os';
import 'dotenv/config';
import http from 'http';
import { Server, Socket } from 'socket.io';
const serverSocketIo = http.createServer();
import socketChat from './Router/SocketChat';
import socketMessage from './Router/SocketMessage';
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
  console.log('Socket conectado', socket.id);

  socketChat(socket);
  
  socketMessage(socket, io);

  socket.on('disconnect', () => {
    console.log('Usuário desconectado', socket.id);
  });
});

serverSocketIo.listen(4000, () => console.log(`Running server SocketIo on: ${ip}:${4000}`));
app.listen(Number(PORT), () => console.log(`Running server Express on: ${ip}:${PORT}`));
