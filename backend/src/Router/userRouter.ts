import express, { Response, Request, NextFunction } from 'express';
import UserController from '../Controller/UserController';
import UserMiddleware from '../Middleware/UserMiddleware';
import AuthMiddleware from '../Middleware/AuthMiddleware';

const router = express();

router.post('/login', [
  (req: Request, res: Response, next: NextFunction) => new UserMiddleware(req, res, next).validateLogin(),
  (req: Request, res: Response) => new UserController(req, res).validateLogin()
]);

router.get('/login/token', [
  (req: Request, res: Response, next: NextFunction) => new AuthMiddleware(req, res, next).isTokenAvailable(),
  (req: Request, res: Response, next: NextFunction) => new AuthMiddleware(req, res, next).isTokenValid()
]);

router.post('/register', [
  (req: Request, res: Response, next: NextFunction) => new UserMiddleware(req, res, next).validateUser(),
  (req: Request, res: Response) =>  new UserController(req, res).save()
]);

router.get('/user/:phoneNumber', [
  (req: Request, res: Response, next: NextFunction) => new AuthMiddleware(req, res, next).isTokenAvailable(),
  (req: Request, res: Response, next: NextFunction) => new AuthMiddleware(req, res, next).validateToken(),
  (req: Request, res: Response, next: NextFunction) => new UserMiddleware(req, res, next).validateGetUser(),
  (req: Request, res: Response) => new UserController(req, res).getUser()
]);

export default router;