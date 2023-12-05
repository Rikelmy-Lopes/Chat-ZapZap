import { DataTypes , Model } from 'sequelize';
import db from '.';


export class UserModel extends Model {
  declare phoneNumber: string;
  declare name: string;
  declare password: string;
}

UserModel.init({
  phoneNumber: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
    autoIncrement: false
  },
  name: {
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
