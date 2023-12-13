import express, { Response, Request, NextFunction } from 'express';
import { UserMessageController } from '../Controller/UserMessageController';
import { UserMessageService } from '../Service/UserMessageService';
import { UserMessageRepository } from '../Repository/UserMessageRepository';
import { userRoomRouter } from './userRoomRouter';
import { Jwt } from '../Utils/Jwt';
import { CryptoHandler } from '../Utils/CryptoHandler';
import { SecurityMiddleware } from '../Middleware/SecurityMiddleware';

const userMessageRouter = express();

const jwt = new Jwt();
const securityMiddleware = new SecurityMiddleware(jwt);

const cryptoHandler = new CryptoHandler();
const userMessageRepository = new UserMessageRepository();
const userMessageService = new UserMessageService(userMessageRepository, cryptoHandler);
const userMessageController = new UserMessageController(userMessageService);


userRoomRouter.get('/message', [
  (req: Request, res: Response, next: NextFunction) => securityMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userMessageController.getMessage(req, res, next)
]);

export {
  userMessageRouter
};