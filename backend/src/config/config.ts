import 'dotenv/config';

export const config = {

  server: {
    apiPort: process.env.API_PORT ? Number(process.env.API_PORT) : 3001,
    socketPort: process.env.SOCKET_PORT ? Number(process.env.SOCKET_PORT) : 4000,
  },

  db: {
    sql: {
      username: process.env.DB_USER ? String(process.env.DB_USER) : 'root',
      password: process.env.DB_PASS ? String(process.env.DB_PASS) : '899899',
      host: process.env.DB_HOST ? String(process.env.DB_HOST) : 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    },

    noSql: {   
      mongodbUrl: process.env.MONGO_DB_URL ? String(process.env.MONGO_DB_URL) : 'mongodb://localhost:27018/Chat-Zap-Zap'
    }
  },

  security: {
    bcryptKey: process.env.BCRYPT_KEY ? String(process.env.BCRYPT_KEY) : 'secret',
    jwtSecret: process.env.SECRET_KEY ? String(process.env.SECRET_KEY) : 'secret',
  }

};