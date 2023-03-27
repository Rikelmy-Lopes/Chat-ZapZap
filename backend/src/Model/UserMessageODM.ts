import { Schema } from 'mongoose';
import { IUsersMessage } from '../Interface/MessageODM';
import AbstractODM from '../database/NOSQL/AbstractODM';


class UserMessageODM extends AbstractODM<IUsersMessage> {
  constructor() {
    const schema = new Schema<IUsersMessage>({
      roomId: { type: String, required: true }, 
      messages: { type: Schema.Types.Mixed, required: true},
    });
    super(schema, 'Message');
  }

  public async add(message: IUsersMessage) {
    await this.model.create(message);
    return;
  }
}

export default UserMessageODM;