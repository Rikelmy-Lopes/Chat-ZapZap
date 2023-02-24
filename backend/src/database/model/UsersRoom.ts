import { DataTypes , Model } from 'sequelize';
import db from '.';
import UsersModel from './Users';


class UsersRoomModel extends Model {
  declare roomId: number;
  declare userId1: number;
  declare userId2: string;
}

UsersRoomModel.init({
  roomId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userId1: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  },
  userId2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    }
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'usersRoom',
  timestamps: false,
  
});

UsersRoomModel.belongsTo(UsersModel, {
  as: 'user1',
  foreignKey: 'userId1'
});

UsersRoomModel.belongsTo(UsersModel, {
  as: 'user2',
  foreignKey: 'userId2'
});

export default UsersRoomModel;