import { DataTypes , Model } from 'sequelize';
import db from '.';
import UsersModel from './UsersModel';
import UsersRoomModel from './UsersRoomModel';


class UserMessage extends Model {
  declare userId: number;
  declare roomId: number;
  declare message: string;
  declare createdAt: string;
}

UserMessage.init({
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  roomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'usersRoom',
      key: 'roomId'
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'userMessage',
  timestamps: false,
  
});

UserMessage.belongsTo(UsersModel, {
  as: 'user',
  foreignKey: 'userId'
});

UserMessage.belongsTo(UsersRoomModel, {
  as: 'room',
  foreignKey: 'roomId'
});

export default UserMessage;