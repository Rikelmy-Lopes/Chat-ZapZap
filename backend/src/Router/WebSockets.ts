import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import UserRoomModel from '../Model/UserRoomModel';
const userRoom = new UserRoomModel();

export default function(socket: Socket, io: Server) {

  socket.on('chat', async ({ phoneNumber1, phoneNumber2 }) => {
    let roomId = await userRoom.getRoom(phoneNumber1, phoneNumber2);
    if(roomId) {
      socket.join(roomId);
    } else {
      roomId = await userRoom.createRoom(phoneNumber1, phoneNumber2);
      socket.join(String(roomId));
    }
    roomId = await userRoom.getRoom(phoneNumber1, phoneNumber2);
    socket.emit('roomId', roomId);
  });
    
  socket.on('message', ({ message, roomId }) => {
    io.to(String(roomId)).emit('message-receive', message);
  });

}