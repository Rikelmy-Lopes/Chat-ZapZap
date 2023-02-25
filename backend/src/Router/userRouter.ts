import express from 'express';
import UserController from '../Controller/UserController';

const router = express();

router.post('/login', (req, res) => new UserController(req, res).validateUser());
router.post('/login/token', (req, res) => new UserController(req, res).validateToken());
router.post('/register', (req, res) => new UserController(req, res).addUser());

export default router;