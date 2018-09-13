module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'iemhub',
    user: process.env.DB_USER || 'iemhub',
    password: process.env.DB_PASSWORD || 'iemhub',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './iemhub.sqlite'
    }
  }
}
