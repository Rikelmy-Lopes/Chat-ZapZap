import express from 'express';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '..', 'public'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use(express.json());


export default app;