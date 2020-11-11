const server = require('express').Router();
const { Category } = require('../db.js');


// S19 - CREAR RUTA PARA ELIMINAR CATEGORIA             ok
// S18 - CREAR RUTA PARA CREAR CATEGORIA                ok
// S20 - CREAR RUTA PARA MODIFICAR CATEGORIA            ok

//Comments: por que solo puedo actualizar si se agregan todos los campos




server.get('/', (req, res) => {
    Category.findAll()
        .then(category => {
            res.send(category);
        })
        .catch(error => {
            res.send(error.mnessage)
        });
});


//S18

server.post('/', (req, res) => {
    const { name, description } = req.body;
    Category.create({
        name: name,
        description: description,
    }).then(result => {
        res.send('Se creo una nueva categoria')
    })
    .catch(err => {
        res.send(err)
    })
});


//S20

server.put('/:id', (req, res) => {
    const categoryId = req.params.id;
    const newData = req.body;
    console.log('info enviara', newData);
    Category.findOne({ where: { id: categoryId}})
    .then(result => {
        result.update(newData),
        res.send(200, result)
    })
    .catch( err => {
        res.send(err)
    })
});


//S19

server.delete('/:id', (req, res) => {
    const categoryId = req.params.id;
    Category.destroy({ where: { id: categoryId}})
    .then(resolve => {
        res.status(200).send('Se elimino la categoria con exito')
    })
    .catch(err => {
        res.send(err.mnessage)
    })
})


module.exports = server;