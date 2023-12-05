import { Schema } from 'mongoose';
import { IUsersMessage } from '../Interface/MessageODM';
import { AbstractModel } from '../database/NOSQL/AbstractModel';
import { IUserMessageRepository } from '../Interface/Repository/IUserMessageRepository';


export class UserMessageRepository extends AbstractModel<IUsersMessage> implements IUserMessageRepository {
  constructor() {
    const schema = new Schema<IUsersMessage>({
      roomId: { type: String, required: true },
      message: { type: Schema.Types.Mixed, required: true},
    });
    
    super(schema, 'userMessage');
  }

  async save(userMessage: IUsersMessage) {
    await this.model.updateOne({ roomId: userMessage.roomId }, {
      roomId: userMessage.roomId,
      $push: { message: userMessage.message }
    }, {
      upsert: true,
    });
  
    return;
  }

  async findAllByRoomId(roomId: string) {
    const result = await this.model.findOne({ roomId });

    return result?.message || [];
  }
}