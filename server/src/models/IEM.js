module.exports = (sequelize, DataTypes) => {
  const IEM = sequelize.define('IEM', {
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

  return IEM
}
