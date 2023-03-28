import { Schema } from 'mongoose';
import { IMessage, IUsersMessage, IUsersMessageODM } from '../Interface/MessageODM';
import AbstractODM from '../database/NOSQL/AbstractODM';


class UserMessageODM extends AbstractODM<IUsersMessageODM> {
  constructor() {
    const schema = new Schema<IUsersMessageODM>({
      roomId: { type: String, required: true }, 
      message: { type: Schema.Types.Mixed, required: true},
    });
    super(schema, 'Message');
  }

  public async saveMessage(UserMessage: IUsersMessage): Promise<void> {
    await this.model.updateOne({ roomId: UserMessage.roomId }, {
      roomId: UserMessage.roomId,
      $push: { message: UserMessage.message }
    }, {
      upsert: true,
    });

    return;
  }

  public async getMessages(roomId: string): Promise<IMessage[]> {
    const result = await this.model.findOne({ roomId });

    return result?.message || [];
  }
}

export default UserMessageODM;