const server = require('express').Router();

const { Review } = require('../db.js');



// CREA REVIEW 

//POST /product/:id/review

server.post('/:id/review', (req, res) => {
    const userId = req.params.id;
    const { calification, description } = req.body;

    Review.findOne({
        where: { userId: userId },
    }).then(review => {
        console.log(review);
        Review.create({
            calification: calification,
            description: description,
            userId: userId,
            productId: req.body.productId
        }).then(result => {
            res.send(result)
        })
            .catch(err => {
                res.send(err, 'Hubo un error. No se creo la review')
            })
    });
});



// MODIFICAR REVIEW

//PUT /product/:id/review/:idReview

server.put('/:id/review/:reviewId', (req, res) => {
    const userId = req.params.id;
    const id = req.params.reviewId;
    const newData = req.body;

    Review.findOne({ where: { userId: userId, id: id } })
        .then(result => {
            result.update(newData),
                res.send(200, result)
        })
        .catch(err => {
            res.send(err)
        })
});


// ELIMINAR REVIEW

//DELETE /product/:id/review/:idReview

server.delete('/:id/review/:reviewId', (req, res) => {
    const userId = req.params.id;
    const id = req.params.reviewId;

    Review.destroy({ where: { userId: userId, id: id } })
        .then(resolve => {
            res.send('Se elimino review')
        });
});


// TRAE todas las rutas de UN producto

// GET /product/:id/review/

server.get('/:id/review', (req, res) => {
    const prodId = req.params.id;
    Review.findAll({ where: { productId: prodId } })
        .then(result => {
            res.send({ result })
        })
})

module.exports = server;