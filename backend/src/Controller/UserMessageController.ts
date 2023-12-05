import { Response, Request, NextFunction } from 'express';
import { IUserMessageService } from '../Interface/Service/IUserMessageService';

export class UserMessageController {
  private userMessageService: IUserMessageService;

  constructor(userMessageService: IUserMessageService) {
    this.userMessageService = userMessageService;
  }

  public async getMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { hashroomid } = req.headers;
      const { success, data } = await this.userMessageService.getMessages(String(hashroomid));
      if (success) return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}