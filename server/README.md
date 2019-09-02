# The Express.JS back-end

## Install dependencies
```
npm install
```

### Start server, hot-reloads and linting for development
```
npm run start
```
- You can change this behaviour in `package.json`
- You can also run `npm run lint` to only perform linting

### Clear the database and import predefined data for IEMs
```
npm run seed
```
- You can change predefined data in `./src/seed/iems.json`
- You can add more json files after modifying `./src/seed/index.js` to build more tables.


## Key design elements
- `controllers` folder is the main server logic.
- `routes.js` determines which controller function to call.
- `passport` folder is used for handling server-side user authentication.
- `models` folder is for building `sqlite3` database tables and storing data.
- By config, the `sqlite3` database will be stored in server's root folder.
- [Sequelize](http://docs.sequelizejs.com/) is used for database management.
- You can change some configurations in `config/config.js`.
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) is used for hashing password.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) is used to sign the user with jwt token.


## Known issues
- The `Rating` model references the `IEM` and `User` model with `ON DELETE CASCADE`, but when an IEM is deleted, relevant entries won't be deleted in the `Rating` table. This might be a bug of `Sequelize`.
  - It is "fixed" by adding extra code to delete entries from the `Rating` table.
