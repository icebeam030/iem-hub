module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex'
    },
    iemId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex'
    },
    rating: DataTypes.INTEGER
  })

  return Rating
}
