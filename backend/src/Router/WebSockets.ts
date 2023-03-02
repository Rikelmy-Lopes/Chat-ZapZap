import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { decryptRoomId, encryptRoomId } from '../Utils/CryptoJs';
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
    const encryptedRoomId = encryptRoomId(String(roomId));
    socket.emit('roomId-send', encryptedRoomId);
  });
    
  socket.on('message-send', ({ message, hashRoomId }) => {
    const decryptedRoomId =  decryptRoomId(hashRoomId);
    io.to(String(decryptedRoomId)).emit('message-receive', message);
  });

}