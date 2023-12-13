import { UserRoomService } from './../Service/UserRoomService';
import express, { Response, Request, NextFunction } from 'express';
import { UserRoomController } from '../Controller/UserRoomController';
import { UserRoomRepository } from '../Repository/UserRoomRepository';
import { UserRoomModel } from '../database/SQL/model/UserRoomModel';
import { UserRepository } from '../Repository/UserRepository';
import { UserModel } from '../database/SQL/model/UserModel';
import { BCrypt } from '../Utils/BCrypt';

const userRoomRouter = express();

const bcrypt = new BCrypt();


const userRepository = new UserRepository(UserModel, bcrypt);
const userRoomRepository = new UserRoomRepository(UserRoomModel, userRepository);
const userRoomService = new UserRoomService(userRoomRepository);
const userRoomController = new UserRoomController(userRoomService);


userRoomRouter.get('/rooms', [
  (req: Request, res: Response, next: NextFunction) => userRoomController.getAllRooms(req, res, next)
]);

export {
  userRoomRouter
};