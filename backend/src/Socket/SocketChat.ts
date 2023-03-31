import { Socket } from 'socket.io/dist/socket';
import UserRoomModel from '../Model/UserRoomModel';
import { encryptRoomId } from '../Utils/CryptoJs';

export default (socket: Socket): void => {
  const userRoomModel = new UserRoomModel();
  socket.on('chat', async ({ phoneNumber1, phoneNumber2 }) => {
    let roomId: string | undefined = await userRoomModel.getRoom(phoneNumber1, phoneNumber2);
    if(roomId) {
      socket.join(roomId);
    } else {
      roomId = await userRoomModel.createRoom(phoneNumber1, phoneNumber2);
      if (!roomId) return;
      socket.join(roomId);
    }
    if (!roomId) return;
    const encryptedRoomId: string = encryptRoomId(roomId);
    socket.emit('roomId-send', encryptedRoomId);
  });
};