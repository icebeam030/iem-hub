module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Iem', {
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
