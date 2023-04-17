import express, { Response, Request, NextFunction } from 'express';
import UserRoomController from '../Controller/UserRoomController';

const router = express();

router.get('/rooms', [
  (req: Request, res: Response) => new UserRoomController(req, res).getAllRooms()
]);

export default router;