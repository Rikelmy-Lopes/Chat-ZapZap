import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { decryptRoomId } from '../Utils/CryptoJs';
import { UserMessageRepository } from '../Repository/UserMessageRepository';

export default (socket: Socket, io: Server) => {
  const userMessageRepository = new UserMessageRepository();

  socket.on('new-message', async ({ message, hashRoomId, userName, createdAt }) => {
    const decryptedRoomId: string =  decryptRoomId(hashRoomId);
    await userMessageRepository.save({roomId: decryptedRoomId, message: {
      userName,
      message,
      createdAt,
    } });
    io.to(String(decryptedRoomId)).emit('new-message', { message, userName, createdAt });
  });
};