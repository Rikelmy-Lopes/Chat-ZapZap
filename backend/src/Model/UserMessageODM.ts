import { Schema } from 'mongoose';
import { IUsersMessage, IMessage } from '../Interface/MessageODM';
import AbstractODM from '../database/NOSQL/AbstractODM';


class UserMessageODM extends AbstractODM<IUsersMessage> {
  constructor() {
    const schema = new Schema<IUsersMessage>({
      roomId: { type: String, required: true }, 
      messages: { type: Schema.Types.Mixed, required: true},
    });
    super(schema, 'Message');
  }

  public async getMessage() {
    const test = await this.model.findOne();
  }
}

export default UserMessageODM;