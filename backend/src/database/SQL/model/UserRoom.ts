import { DataTypes , Model } from 'sequelize';
import db from '.';
import UsersModel from './User';


class UserRoom extends Model {
  declare roomId: string;
  declare phoneNumber1: string;
  declare phoneNumber2: string;
}

UserRoom.init({
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

UserRoom.belongsTo(UsersModel, {
  as: 'user1',
  foreignKey: 'phoneNumber1'
});

UserRoom.belongsTo(UsersModel, {
  as: 'user2',
  foreignKey: 'phoneNumber2'
});

export default UserRoom;