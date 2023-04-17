import http from 'http';
import { Server, Socket } from 'socket.io';
import socketChat from './Socket/SocketChat';
import socketMessage from './Socket/SocketMessage';

const socket = http.createServer();

const io = new Server(socket, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket: Socket) => {
  console.log('\x1b[32m%s\x1b[0m', `Socket conectado: ${socket.id} `);
    
  socketChat(socket);

  socketMessage(socket, io);
  
  socket.on('disconnect', () => {
    console.log('\x1b[31m%s\x1b[0m', `Usuário desconectado: ${socket.id} `);
  });
});


export default socket;