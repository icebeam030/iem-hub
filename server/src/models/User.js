var bcrypt = require('bcryptjs')

// hash the password using bcrypt
function hashPassword (user, options) {
  const SALT_FACTOR = 10
  if (!user.changed('password')) {
    return
  }

  const hash = bcrypt.hashSync(user.password, SALT_FACTOR)
  user.setDataValue('password', hash)
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  // compare the password when user tries to login
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  return User
}
