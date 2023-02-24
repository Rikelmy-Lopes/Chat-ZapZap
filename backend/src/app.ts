import express from 'express';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';
import userRouter from './Router/userRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');



export default app;