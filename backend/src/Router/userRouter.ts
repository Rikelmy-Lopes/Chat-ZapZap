import express, { Response, Request, NextFunction } from 'express';
import { UserController } from '../Controller/UserController';
import { UserMiddleware } from '../Middleware/UserMiddleware';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';
import { UserService } from '../Service/UserService';
import { UserRepository } from '../Repository/UserRepository';
import { UserModel } from '../database/SQL/model/UserModel';
import { BCrypt } from '../Utils/BCrypt';
import { Jwt } from '../Utils/Jwt';

const userRouter = express();

const jwt = new Jwt();
const userMiddleware = new UserMiddleware();
const authMiddleware = new AuthMiddleware(jwt);

const bcrypt = new BCrypt();
const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository, bcrypt, jwt);
const userController = new UserController(userService);


userRouter.post('/login', [
  (req: Request, res: Response, next: NextFunction) => userMiddleware.login(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userController.login(req, res, next)
]);

userRouter.get('/login/token', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.isTokenAvailable(req, res, next),
  (req: Request, res: Response, next: NextFunction) => authMiddleware.isTokenValid(req, res, next)
]);

userRouter.post('/register', [
  (req: Request, res: Response, next: NextFunction) => userMiddleware.register(req, res, next),
  (req: Request, res: Response, next: NextFunction) =>  userController.register(req, res, next)
]);

userRouter.get('/user/:phoneNumber', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.isTokenAvailable(req, res, next),
  (req: Request, res: Response, next: NextFunction) => authMiddleware.validateToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userMiddleware.validateGetUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userController.getUser(req, res, next)
]);

export {
  userRouter
};