import app from './app';
import os from 'os';
import 'dotenv/config';
import UsersModel from './database/model/UsersModel';
import UsersRoomModel from './database/model/UsersRoomModel';
import UserMessage from './database/model/UserMessage';
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


app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/me/:phone', (req, res) => {
  const { phone } = req.params;
  const user = users.find((u: any) => u.phone === phone);
  if (user) {
    res.render('index.html');
    return;
  }
  res.status(404).json({ message: 'User Not Found'});
});

app.get('/me/:phone1/chatWith/:phone2', (req, res) => {
  // const { phone1 } = req.params;
  // const user = users.find((u: any) => u.phone === phone);
  // if (user) {
  res.render('message.html');
  return;
  // }
  // res.status(404).json({ message: 'User Not Found'});
});

app.get('/test', async (req, res) => {
  const data = await UserMessage.findAll({
    include: [
      { model: UsersModel, as: 'user' },
      { model: UsersRoomModel, as: 'room' }
    ]
  });
  res.status(200).json(data);
});

let ip : string;
const networkInterfaces = os.networkInterfaces();
const PORT = process.env.PORT || 3001;
if (networkInterfaces.wlp1s0) {
  ip = networkInterfaces.wlp1s0[0].address;
} else {
  ip = 'localhost';
}


export {
  app,
  PORT,
  ip,
};