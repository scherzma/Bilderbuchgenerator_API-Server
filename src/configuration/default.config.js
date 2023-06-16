export default {
  api: {
    root: '/api/v1/',
  },
  auth: {
    secret: 'asd',
  },
  db: {
    HOST: 'localhost',
    USER: 'Bilderbuchgenerator',
    PASSWORD: 'password',
    DB: 'bilderbuchgenerator',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  development: {
    deployRoutes: true,
  },
};
