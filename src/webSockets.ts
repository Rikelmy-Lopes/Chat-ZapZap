import http from 'http';
import { Server } from 'socket.io';
import { PORT, app, ip } from './server';
const serverSocketIo = http.createServer();
const io = new Server(serverSocketIo, {
  cors: {
    origin: '*'
  }
});

interface IUserRoom {
    user1: string,
    user2: string,
    roomId: string,
    messages: string[]
  }

const usersMessageRoom: IUserRoom[] = [];

function getRoom(user1Phone: string, user2Phone: string): string | undefined {
  const result =  usersMessageRoom.find(room => {
    return (room.user1 === user1Phone && room.user2 === user2Phone) ||
           (room.user1 === user2Phone && room.user2 === user1Phone);
  });

  return result?.roomId;
}

function addMessage (roomId: string, message: string): void {
  const obj = usersMessageRoom.find(obj => obj.roomId === String(roomId));

  if (obj) {
  // Adicionando mensagens ao array messages
    obj.messages.push(message);
  }
}

io.on('connection', (socket) => {
  console.log('Socket conectado', socket.id);


  socket.on('chat-open', ({ phone1, phone2 }) => {
    const roomId = getRoom(phone1, phone2);
    if(roomId) {
      socket.join(roomId);
    } else {
      usersMessageRoom.push({
        user1: phone1,
        user2: phone2,
        roomId: String( Math.floor(Math.random() * 900000000000 + 100000000000)),
        messages: [],
      });
      const roomId = getRoom(phone1, phone2);
      socket.join(roomId || 'defaultRoom');
    }
    const roomId2 = getRoom(phone1, phone2);
    socket.emit('roomId', roomId2);
    const messages = usersMessageRoom.find((obj) => obj.roomId === roomId)?.messages;
    socket.emit('message-receive-buck', messages);
  });

  socket.on('message', ({ message, roomId }) => {
    addMessage(roomId, message);
    const messages = usersMessageRoom.find((obj) => obj.roomId === roomId)?.messages;
    io.to(roomId).emit('message-receive', messages);
  });
  
  // socket.on('message', ({ phone1, phone2, message }) => {
  //   const roomId = getRoom(phone1, phone2);
  //   if(roomId) {
  //     socket.join(roomId);
  //     io.to(roomId).emit('message-receive', message);
  //   } else {
  //     usersMessageRoom.push({
  //       user1: phone1,
  //       user2: phone2,
  //       roomId: String( Math.floor(Math.random() * 900000000000 + 100000000000)),
  //       messages: [],
  //     });
  //     const roomId = getRoom(phone1, phone2);
  //     socket.join(roomId || 'defaultRoom');
  //     io.to(roomId || 'defaultRoom').emit('message-receive', message);
  //   }
  // });
  
  
  socket.on('disconnect', () => {
    console.log('Usuário desconectado', socket.id);
  });
});

serverSocketIo.listen(4000, ip, () => console.log(`Running server SocketIo on: ${ip}:${PORT}`));
app.listen(Number(PORT), ip, () => console.log(`Running server Express on: ${ip}:${PORT}`));