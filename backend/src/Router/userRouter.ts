import express from 'express';
import UserController from '../Controller/UserController';

const router = express();

router.post('/login', (req, res) => new UserController(req, res).validateUser());

export default router;