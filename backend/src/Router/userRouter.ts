import express, { Response, Request, NextFunction } from 'express';
import { UserController } from '../Controller/UserController';
import { UserMiddleware } from '../Middleware/UserMiddleware';
import { UserService } from '../Service/UserService';
import { UserRepository } from '../Repository/UserRepository';
import { UserModel } from '../database/SQL/model/UserModel';
import { BCrypt } from '../Utils/BCrypt';
import { Jwt } from '../Utils/Jwt';
import { SecurityMiddleware } from '../Middleware/SecurityMiddleware';

const userRouter = express();

const jwt = new Jwt();
const bcrypt = new BCrypt();

const userMiddleware = new UserMiddleware();
const securityMiddleware = new SecurityMiddleware(jwt);

const userRepository = new UserRepository(UserModel, bcrypt);
const userService = new UserService(userRepository, bcrypt, jwt);
const userController = new UserController(userService);


userRouter.get('/user/:phoneNumber', [
  (req: Request, res: Response, next: NextFunction) => securityMiddleware.verifyToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userMiddleware.validateGetUser(req, res, next),
  (req: Request, res: Response, next: NextFunction) => userController.getUser(req, res, next)
]);


export {
  userRouter
};