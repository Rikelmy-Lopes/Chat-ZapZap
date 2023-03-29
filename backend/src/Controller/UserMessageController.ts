import { Response, Request } from 'express';
import UserMessageODM from '../Model/UserMessageODM';
import UserMessageService from '../Service/UserMessageService';

class UserMessageController {
  private response: Response;
  private request: Request;
  private service: UserMessageService;
  private ODM: UserMessageODM;

  constructor(request: Request, response: Response) {
    this.service = new UserMessageService();
    this.ODM = new UserMessageODM();
    this.request = request;
    this.response = response;
  }

  public async getMessage() {
    const { hashroomid } = this.request.headers;
    const { success, data } = await this.service.getMessage(String(hashroomid));
    if (success) return this.response.status(200).json(data);
  }
}

export default UserMessageController;