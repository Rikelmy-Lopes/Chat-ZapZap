import { Sequelize } from 'sequelize';
import * as sqlConfig from '../config/config';

const sequelize = new Sequelize(sqlConfig);

export default sequelize;