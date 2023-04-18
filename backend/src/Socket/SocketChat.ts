import { Socket } from 'socket.io/dist/socket';
import UserRoomModel from '../Model/UserRoomModel';
import { encryptRoomId } from '../Utils/CryptoJs';

export default (socket: Socket): void => {
  const userRoomModel = new UserRoomModel();
  socket.on('new-chat', async ({ toPhoneNumber, fromPhoneNumber }) => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    let roomId: string | undefined = await userRoomModel.getRoom(toPhoneNumber, fromPhoneNumber);
    if(roomId) {
      socket.join(roomId);
    } else {
      roomId = await userRoomModel.createRoom(toPhoneNumber, fromPhoneNumber);
      if (!roomId) return;
      socket.join(roomId);
    }
    if (!roomId) return;
    const encryptedRoomId: string = encryptRoomId(roomId);
    socket.emit('get-hashRoomId', encryptedRoomId);
  });
};