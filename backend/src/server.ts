import app from './app';
import 'dotenv/config';
import connectToDatabase from './database/NOSQL/config/connection';
import socket from './socket';


const PORT = process.env.PORT || 3001;

connectToDatabase().then(()=> {
  socket.listen(4000, () => console.log(`Running server SocketIo on: http://localhost:${4000}`));
  app.listen(Number(PORT), () => console.log(`Running server Express on: http://localhost:${PORT}`));

}).catch((error) => {
  console.log('Connection with database generated an error:\r\n');
  console.error(error);
  console.log('\r\nServer initialization cancelled');
  process.exit(0);
});

