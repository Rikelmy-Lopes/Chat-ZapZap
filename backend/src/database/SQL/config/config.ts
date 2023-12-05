import { Options } from 'sequelize';
import { config } from '../../../config/config';

const sqlConfig: Options = {
  username: config.db.sql.username,
  password: config.db.sql.password,
  database: 'chat-zap-zap',
  host: config.db.sql.host,
  port: config.db.sql.port,
  dialect: 'mysql',
  dialectOptions: {
    timezone: '-03:00',
  },
  logging: false,
  timezone: '-03:00'
};
  
module.exports = sqlConfig;