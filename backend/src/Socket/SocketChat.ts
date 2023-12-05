import { Socket } from 'socket.io/dist/socket';
import { CryptoHandler } from '../Utils/CryptoHandler';
import { UserRoomRepository } from '../Repository/UserRoomRepository';
import { UserModel } from '../database/SQL/model/UserModel';
import { UserRepository } from '../Repository/UserRepository';
import { UserRoomModel } from '../database/SQL/model/UserRoomModel';

export default (socket: Socket): void => {
  const userRepository = new UserRepository(UserModel);
  const userRoomRepository = new UserRoomRepository(UserRoomModel, userRepository);
  const cryptoHandler = new CryptoHandler();
  
  socket.on('new-chat', async ({ toPhoneNumber, fromPhoneNumber }) => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    let roomId = await userRoomRepository.findOne(toPhoneNumber, fromPhoneNumber);
    if(roomId) {
      socket.join(roomId);
    } else {
      roomId = await userRoomRepository.save(toPhoneNumber, fromPhoneNumber);
      if (!roomId) return;
      socket.join(roomId);
    }
    if (!roomId) return;
    const encryptedRoomId: string = cryptoHandler.encrypt(roomId);
    socket.emit('get-hashRoomId', encryptedRoomId);
  });
};