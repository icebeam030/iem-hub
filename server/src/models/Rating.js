module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: DataTypes.INTEGER,
    iemId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  })

  return Rating
}
