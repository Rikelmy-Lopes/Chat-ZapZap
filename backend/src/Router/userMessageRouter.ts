import express, { Response, Request, NextFunction } from 'express';
import { UserMessageController } from '../Controller/UserMessageController';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import { UserMessageService } from '../Service/UserMessageService';
import { UserMessageRepository } from '../Repository/UserMessageRepository';
import { userRoomRouter } from './userRoomRouter';

const userMessageRouter = express();

const authMiddleware = new AuthMiddleware();

const userMessageRepository = new UserMessageRepository();
const userMessageService = new UserMessageService(userMessageRepository);
const userMessageController = new UserMessageController(userMessageService);


userRoomRouter.get('/message', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.isTokenAvailable(req, res, next),
  (req: Request, res: Response, next: NextFunction) => authMiddleware.validateToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userMessageController.getMessage(req, res, next)
]);

export {
  userMessageRouter
};