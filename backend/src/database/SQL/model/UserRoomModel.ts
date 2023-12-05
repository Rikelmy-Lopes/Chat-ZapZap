import { DataTypes , Model } from 'sequelize';
import db from '.';
import { UserModel } from './UserModel';


export class UserRoomModel extends Model {
  declare roomId: string;
  declare phoneNumber1: string;
  declare phoneNumber2: string;
}

UserRoomModel.init({
  roomId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  phoneNumber1: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'phoneNumber',
    }
  },
  phoneNumber2: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: 'phoneNumber',
    }
  }
}, {
  underscored: true,
  sequelize: db,
  modelName: 'usersRoom',
  timestamps: false,
  
});

UserRoomModel.belongsTo(UserModel, {
  as: 'user1',
  foreignKey: 'phoneNumber1'
});

UserRoomModel.belongsTo(UserModel, {
  as: 'user2',
  foreignKey: 'phoneNumber2'
});
