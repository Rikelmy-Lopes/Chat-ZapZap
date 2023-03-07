import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { decryptRoomId } from '../Utils/CryptoJs';
import UserMessageModel from '../Model/UserMessage';

export default (socket: Socket, io: Server) => {
  const userMessageModel = new UserMessageModel();
  socket.on('message-send', async ({ message, hashRoomId, userName, phoneNumber }) => {
    const decryptedRoomId: string =  decryptRoomId(hashRoomId);
    await userMessageModel.saveMessage(message, decryptedRoomId, phoneNumber);
    const date = new Date();
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    io.to(String(decryptedRoomId)).emit('message-receive', { message, userName, hour });
  });
};