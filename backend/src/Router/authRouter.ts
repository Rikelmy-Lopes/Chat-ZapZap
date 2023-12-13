import express, { NextFunction, Request, Response } from 'express';
import { AuthService } from '../Service/AuthService';
import { UserRepository } from '../Repository/UserRepository';
import { UserModel } from '../database/SQL/model/UserModel';
import { BCrypt } from '../Utils/BCrypt';
import { Jwt } from '../Utils/Jwt';
import { AuthController } from '../Controller/AuthController';
import { AuthMiddleware } from '../Middleware/AuthMiddleware';

const authRouter = express.Router();

const bcrypt = new BCrypt();
const jwt = new Jwt();

const userRepository = new UserRepository(UserModel, bcrypt);
const authMiddleware = new AuthMiddleware();
const authService = new AuthService(userRepository, bcrypt, jwt);
const authController = new AuthController(authService, jwt);

authRouter.post('/login', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.login(req, res, next),
  (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next) 
]);

authRouter.get('/login/token', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.validateToken(req, res, next),
  (req: Request, res: Response, next: NextFunction) => authController.validateToken(req, res, next),
]);

authRouter.post('/register', [
  (req: Request, res: Response, next: NextFunction) => authMiddleware.register(req, res, next), 
  (req: Request, res: Response, next: NextFunction) => authController.register(req, res, next) 
]);




export {
  authRouter
};