import { Server } from 'socket.io';
import { Socket } from 'socket.io/dist/socket';
import { CryptoHandler } from '../Utils/CryptoHandler';
import { UserMessageRepository } from '../Repository/UserMessageRepository';

export default (socket: Socket, io: Server) => {
  const userMessageRepository = new UserMessageRepository();
  const cryptoHandler = new CryptoHandler();

  socket.on('new-message', async ({ message, hashRoomId, userName, createdAt }) => {
    const decryptedRoomId: string =  cryptoHandler.decrypt(hashRoomId);
    await userMessageRepository.save({roomId: decryptedRoomId, message: {
      userName,
      message,
      createdAt,
    } });
    io.to(decryptedRoomId).emit('new-message', { message, userName, createdAt });
  });
};