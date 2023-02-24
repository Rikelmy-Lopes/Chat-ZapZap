import { DataTypes , Model } from 'sequelize';
import db from '.';


class UsersModel extends Model {
  declare id: number;
  declare name: string;
  declare phoneNumber: string;
}

UsersModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
  
});

export default UsersModel;