import express, { Response, Request, NextFunction } from 'express';
import UserController from '../Controller/UserController';
import UserMiddleware from '../Middleware/UserMiddleware';

const router = express();

router.post('/login', [
  (req: Request, res: Response, next: NextFunction) => new UserMiddleware(req, res, next).validateLogin(),
  (req: Request, res: Response) => new UserController(req, res).validateLogin()
]);
router.post('/login/token', [
  (req: Request, res: Response, next: NextFunction) => new UserMiddleware(req, res, next).validateToken(),
  (req: Request, res: Response) => new UserController(req, res).validateToken()
]);
router.post('/register', [
  (req: Request, res: Response, next: NextFunction) => new UserMiddleware(req, res, next).validateUser(),
  (req: Request, res: Response) =>  new UserController(req, res).save()
]);


export default router;