module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // email format is enforced in front-end
    // the back-end converts email to all lower case before saving
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    // password will be hashed before saving to the table
    password: DataTypes.STRING
  })

  return User
}
