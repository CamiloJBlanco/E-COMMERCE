const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('cartorder', {
        state: {
            type: DataTypes.ENUM,
            values: ["carrito", "creada", "procesando", "cancelada", "completa"],
            defaultValue: "carrito",
        },
        price: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },

    },
        { timestamp: false }
    );
};
