module.exports = (sequelize, DataTypes) => {
  const IEM = sequelize.define('IEM', {
    brand: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  })

  return IEM
}
