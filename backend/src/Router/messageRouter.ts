import express, { Response, Request } from 'express';
import MessageController from '../Controller/UserMessageController';

const router = express();

router.get('/message', [
  (req: Request, res: Response) => new MessageController(req, res).getMessage()
]);

export default router;