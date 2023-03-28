import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { decryptRoomId } from '../Utils/CryptoJs';
// import UserMessageModel from '../Model/UserMessageModel';
import UserMessageODM from '../Model/UserMessageODM';

export default (socket: Socket, io: Server) => {
  // const userMessageModel = new UserMessageModel();
  const userMessageModel = new UserMessageODM();
  socket.on('message-send', async ({ message, hashRoomId, userName }) => {
    const decryptedRoomId: string =  decryptRoomId(hashRoomId);
    await userMessageModel.saveMessage({roomId: decryptedRoomId, message: {
      userName,
      message,
      createdAt: String(new Date())
    } });
    const date = new Date();
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    io.to(String(decryptedRoomId)).emit('message-receive', { message, userName, hour });
  });
};