import express from 'express';
import cors from 'cors';
import { userRouter } from './Router/userRouter';
import { userMessageRouter } from './Router/userMessageRouter';
import { userRoomRouter } from './Router/userRoomRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);

app.use(userMessageRouter);

app.use(userRoomRouter);


export {
  app
};