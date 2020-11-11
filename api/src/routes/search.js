const server = require('express').Router();

const { Product } = require('../db.js');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

server.get('/', (req, res) => {
    const queryName = req.query.name;
    const queryDes =req.query.description;
    console.log(req.queryName);
    Product.findAll({
        where: {
            [Op.or]: [
                {
                    name: { [Op.iLike]: "%" + queryName + "%" }
                },
                {
                    description: { [Op.iLike]: "%" + queryDes + "%" }
                }
    ]
    }
    })
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err, message);
    })
})

        module.exports = server;

