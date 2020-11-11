const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('review', {
        calification: {
            type: DataTypes.ENUM('1', '2', '3', '4', '5'),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {timestamp:false}
    );
};


/*
Crear el modelo Reviews y relacionarlo con Producto.
Un producto puede tener muchas reviews. Una review es de un usuario.
La review debe tener un sistema de calificación y una descripción.
*/
