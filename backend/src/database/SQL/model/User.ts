import { DataTypes , Model } from 'sequelize';
import db from '.';


class User extends Model {
  declare phoneNumber: string;
  declare name: string;
  declare password: string;
}

User.init({
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

export default User;