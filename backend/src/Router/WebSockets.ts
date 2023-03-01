import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import UserRoomModel from '../Model/UserRoomModel';
import { getInfoFromToken } from '../Utils/JWT';
const userRoom = new UserRoomModel();

export default function(socket: Socket, io: Server) {

  socket.on('chat', async ({ userPhone, token }) => {
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

}