const { DataTypes, DATEONLY } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull:false
    },
    brand: {
      type: DataTypes.STRING,
      allowNull:false
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: { 
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING
    },
  },
  {timestamp:false}

  );
};
