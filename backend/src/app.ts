import express from 'express';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';
import userRouter from './Router/userRouter';
import messageRouter from './Router/messageRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);

app.use(messageRouter);


export default app;