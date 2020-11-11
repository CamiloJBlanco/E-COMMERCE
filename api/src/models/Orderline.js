const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('orderline', {

    //     id: {
    //         type: DataTypes.INTEGER,
    //         primaryKey: true,
    //         autoIncrement: true
    //   },
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
