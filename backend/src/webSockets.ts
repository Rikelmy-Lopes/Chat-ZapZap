import http from 'http';
import { Server } from 'socket.io';
import UserRoomModel from './Model/UserRoomModel';
import { PORT, app, ip } from './server';
import { getInfoFromToken } from './Utils/JWT';
const userRoom = new UserRoomModel();
const serverSocketIo = http.createServer();
const io = new Server(serverSocketIo, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('Socket conectado', socket.id);


  socket.on('chat-open', async ({ userPhone, token }) => {
    const phoneNumber = getInfoFromToken(token) as string;
    const roomId = await userRoom.getRoom(userPhone, phoneNumber);
    if(roomId) {
      socket.join(String(roomId));
    } else {
      const roomId = await userRoom.createRoom(userPhone, phoneNumber);
      socket.join(String(roomId));
    }
    const roomId2 = await userRoom.getRoom(userPhone, phoneNumber);
    socket.emit('roomId', roomId2);
  });

  socket.on('message', ({ message, roomId }) => {
    io.to(String(roomId)).emit('message-receive', message);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectado', socket.id);
  });
});

serverSocketIo.listen(4000, ip, () => console.log(`Running server SocketIo on: ${ip}:${4000}`));
app.listen(Number(PORT), ip, () => console.log(`Running server Express on: ${ip}:${PORT}`));