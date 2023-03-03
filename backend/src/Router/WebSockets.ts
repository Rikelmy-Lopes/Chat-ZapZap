import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { decryptRoomId, encryptRoomId } from '../Utils/CryptoJs';
import UserRoomModel from '../Model/UserRoomModel';
const userRoom = new UserRoomModel();

export default function(socket: Socket, io: Server): void {
  socket.on('chat', async ({ phoneNumber1, phoneNumber2 }) => {
    let roomId: string | undefined = await userRoom.getRoom(phoneNumber1, phoneNumber2);
    if(roomId) {
      socket.join(roomId);
    } else {
      roomId = await userRoom.createRoom(phoneNumber1, phoneNumber2);
      if (!roomId) return;
      socket.join(roomId);
    }
    roomId = await userRoom.getRoom(phoneNumber1, phoneNumber2);
    if (!roomId) return;
    const encryptedRoomId: string = encryptRoomId(roomId);
    socket.emit('roomId-send', encryptedRoomId);
  });
    
  socket.on('message-send', ({ message, hashRoomId, userName }) => {
    const date = new Date();
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    const decryptedRoomId: string =  decryptRoomId(hashRoomId);
    io.to(String(decryptedRoomId)).emit('message-receive', { message, userName, hour });
  });

}