import express, { Response, Request, NextFunction } from 'express';
import MessageController from '../Controller/UserMessageController';

const router = express();

router.get('/message/:hashRoomId', [
  (req: Request, res: Response) => new MessageController(req, res).getMessages()
]);

router.post('/message', [
  (req: Request, res: Response) => new MessageController(req, res).add()
]);

export default router;