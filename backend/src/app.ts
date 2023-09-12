import express from 'express';
import cors from 'cors';
import userRouter from './Router/userRouter';
import messageRouter from './Router/messageRouter';
import userRoomRouter from './Router/userRoomRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);

app.use(messageRouter);

app.use(userRoomRouter);


export default app;