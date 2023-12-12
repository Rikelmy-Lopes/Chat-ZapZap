import express, { Response, Request, NextFunction } from 'express';
import { UserMessageController } from '../Controller/UserMessageController';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import { UserMessageService } from '../Service/UserMessageService';
import { UserMessageRepository } from '../Repository/UserMessageRepository';
import { userRoomRouter } from './userRoomRouter';
import { Jwt } from '../Utils/Jwt';
import { CryptoHandler } from '../Utils/CryptoHandler';

const userMessageRouter = express();

const jwt = new Jwt();
const authMiddleware = new AuthMiddleware(jwt);

const cryptoHandler = new CryptoHandler();
const userMessageRepository = new UserMessageRepository();
const userMessageService = new UserMessageService(userMessageRepository, cryptoHandler);
const userMessageController = new UserMessageController(userMessageService);


userRoomRouter.get('/message', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.validateToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userMessageController.getMessage(req, res, next)
]);

export {
  userMessageRouter
};