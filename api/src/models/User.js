const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // phone: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // address: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        role: {
            type: DataTypes.ENUM,
            values: ["admin", "user"],
            defaultValue: "user",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail:true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
          },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {timestamp:false}
    );
};
