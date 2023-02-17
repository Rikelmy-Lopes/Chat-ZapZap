import app from './app';
import 'dotenv/config';
import http from 'http';
import { Server } from 'socket.io';
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const users: any = [
  {
    name: 'Rikelmy Lps',
    phone: '38998392574'
  },
  {
    name: 'Angelina Lps',
    phone: '38999942513'
  },
  {
    name: 'Jorge Alves',
    phone: '38999269825'
  }
];

interface IUserRoom {
  user1: string,
  user2: string,
  roomId: string,
  messages: string[]
}

const usersMessageRoom: IUserRoom[] = [];

function getRoom(user1Phone: string, user2Phone: string): string | undefined {
  const result =  usersMessageRoom.find(room => {
    return (room.user1 === user1Phone && room.user2 === user2Phone) ||
           (room.user1 === user2Phone && room.user2 === user1Phone);
  });

  return result?.roomId;
}

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/user/:phone', (req, res) => {
  const { phone } = req.params;
  const user = users.find((u: any) => u.phone === phone);
  if (user) {
    res.render('message.html');
    return;
  }
  res.status(404).json({ message: 'User Not Found'});
});

io.on('connection', (socket) => {
  console.log('Socket conectado', socket.id);

  socket.on('message', ({ phone1, phone2, message }) => {
    const roomId = getRoom(phone1, phone2);
    if(roomId) {
      socket.join(roomId);
      io.to(roomId).emit('message-receive', message);
    } else {
      usersMessageRoom.push({
        user1: phone1,
        user2: phone2,
        roomId: String( Math.floor(Math.random() * 900000000000 + 100000000000)),
        messages: [],
      });
      const roomId = getRoom(phone1, phone2);
      socket.join(roomId || 'defaultRoom');
      io.to(roomId || 'defaultRoom').emit('message-receive', message);
    }
  });


  socket.on('disconnect', () => {
    console.log('Usuário desconectado', socket.id);
  });
});

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => console.log(`Running server on port: ${PORT}`));