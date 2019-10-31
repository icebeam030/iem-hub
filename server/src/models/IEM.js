module.exports = (sequelize, DataTypes) => {
  return sequelize.define('IEM', {
    brand: {
      type: DataTypes.STRING,
      unique: 'compositeIndex'
    },
    name: {
      type: DataTypes.STRING,
      unique: 'compositeIndex'
    },
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  })
}
