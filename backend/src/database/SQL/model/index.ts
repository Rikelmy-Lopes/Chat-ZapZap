import { Sequelize } from 'sequelize';
import { sqlConfig } from '../config/database';

const sequelize = new Sequelize(sqlConfig);

export default sequelize;