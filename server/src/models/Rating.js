module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: DataTypes.FLOAT
  })

  Rating.associate = function (models) {
    Rating.belongsTo(models.User, {
      as: 'user',
      onDelete: 'cascade'
    })
    Rating.belongsTo(models.IEM, {
      as: 'iem',
      onDelete: 'cascade'
    })
  }

  return Rating
}
