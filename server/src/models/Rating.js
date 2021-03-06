module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    rating: DataTypes.FLOAT
  })

  // each rating will be based on unique combination of userId and iemId
  Rating.associate = (models) => {
    Rating.belongsTo(models.User, {
      as: 'user',
      onDelete: 'cascade'
    })
    Rating.belongsTo(models.Iem, {
      as: 'iem',
      onDelete: 'cascade'
    })
  }

  return Rating
}
