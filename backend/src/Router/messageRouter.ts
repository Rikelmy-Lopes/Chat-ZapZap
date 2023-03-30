import express, { Response, Request, NextFunction } from 'express';
import MessageController from '../Controller/UserMessageController';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const router = express();

router.get('/message', [
  (req: Request, res: Response, next: NextFunction) => new AuthMiddleware(req, res, next).isTokenAvailable(),
  (req: Request, res: Response, next: NextFunction) => new AuthMiddleware(req, res, next).validateToken(),
  (req: Request, res: Response) => new MessageController(req, res).getMessage()
]);

export default router;