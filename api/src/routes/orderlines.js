const server = require('express').Router();

const { Cartorder } = require('../db.js');
const { Product } = require('../db.js');
const { Orderline } = require('../db.js');
const { User } = require('../db.js');


// TRAE TODAS LAS ORDENES

server.get('/', function (req, res) {
      Product.findAll({
        include: [{
            model: Cartorder,
            through: Orderline
          }]
        })
      .then(orders => {
          res.send({ orders })
      })
  })


// TRAE UNA ORDEN EN ESPECIFICO POR ID

  server.get('/:id', (req, res) => {
    Cartorder.findOne({
      where: { id: req.params.id },
    }).then(order => {
      res.send({ order })
    });
  });
  


//  EDITA UNA ORDEN EN PARTICULAR

server.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const newData = req.body;
    Cartorder.findOne({ where: { id: orderId } })
      .then(result => {
        result.update(newData);
        res.send(200, result)
      })
      .catch(err => {
        res.send(err)
      })
  
  });
  



module.exports = server;
