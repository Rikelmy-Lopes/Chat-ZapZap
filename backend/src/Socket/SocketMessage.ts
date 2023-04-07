import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { decryptRoomId } from '../Utils/CryptoJs';
import UserMessageODM from '../Model/UserMessageModel';

export default (socket: Socket, io: Server) => {
  const userMessageModel = new UserMessageODM();
  socket.on('new-message', async ({ message, hashRoomId, userName, createdAt }) => {
    const decryptedRoomId: string =  decryptRoomId(hashRoomId);
    await userMessageModel.saveMessage({roomId: decryptedRoomId, message: {
      userName,
      message,
      createdAt,
    } });
    io.to(String(decryptedRoomId)).emit('new-message', { message, userName, createdAt });
  });
};