module.exports = (sequelize, DataTypes) => {
  const IEM = sequelize.define('IEM', {
    brand: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INT,
    imageUrl: DataTypes.STRING
  })

  return IEM
}
