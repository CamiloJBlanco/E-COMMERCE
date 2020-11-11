const server = require('express').Router();
const { Product, Category } = require('../db.js');

const multer = require('multer');
const path = require('path');


// RUTAS A CREAR

// S14 and S21 - CREAR RUTA A CATALOGO / HOME PAGE      ok
// S15 and S24 - CREAR RUTA PARA VER PRODUCTO POR ID    ok
// S22 - CREAR RUTA QUE DEVUELTA PROD. POR CAT.         ok
// S23 - CREAR RUTA QUE BUSQUE PROD. POR KEYWORD        ok --
// S25 - CREAR RUTA PARA CREAR PRODUCTO                 ok
// S26 - CREAR UNA RUTA PARA MODIFICAR UN PRODUCTO      ok --
// S27 - CREAR UNA RUTA PARA ELIMINAR UN PRODUCTO       ok


// Comments: como funciona el query realmente???
// Como comprobamos el error al modificar un producto.            


// S14 and S21

server.get('/', (req, res) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch();
});

// server.get('/category', (req, res) => {
// 	Category.findAll()
// 		.then(categories => {
// 			res.send(categories);
// 		})
// 		.catch();
// });

// S15 and S24

server.get('/:id', (req, res) => {
	const productId = req.params.id;
	console.log(productId)
	Product.findByPk(productId)
		.then(response => {
			if (response) {
				res.send(response)
			} else {
				res.status(404).send({ message: 'Poducto not Found' })
			};
		})

})


// S22

// server.get('/:id', (req, res) => {
//     console.log(req.params.id);
//     const catName = req.params.id;
//     Product.findAll( {where: {Category: catName}})
//     .then( result => {
//         res.send(result)
//     })
// })

server.post('/:idproducto/category/:idcategoria', (req, res) => {
    const { idproducto, idcategoria } = req.params;
    const results = Promise.all([
        Product.findByPk(idproducto),
        Category.findByPk(idcategoria)
    ]).then(results => {
        return results[0].addCategory(results[1])
    }).then(productAssociated => {
        res.json(productAssociated)
    })
        .catch(err => {
            res.send(err)
        })
});





// MULTER

const storage = multer.diskStorage({
	destination: path.join(__dirname, '../../public'),
	filename: (req, file, cb) => {
		cb(null, `img${Date.now()}.jpg`);
	}

})

const uploadImage = multer({
	storage,
	limits: {fileSize: 1000000}
}).single('image');


// S25

server.post('/',uploadImage, (req, res) => {
	const { name, description, price, stock, category, brand } = req.body;
	Product.create({
		name: name,
		description: description,
		brand: brand,
		price: price,
		stock: stock,
		category: category,
		image: req.file.filename,
	}).then(result => {
		res.send('Se creo el producto')
	})
		.catch(err => {
			res.send(err, 'Hubo un error. No se creo el producto')
		})
});



// S26

server.put('/:id', (req, res) => {
    const productId = req.params.id;
    const newData = req.body;
    Product.findOne({ where: { id: productId } })
        .then(result => {
            result.update(newData),
                res.send(200, result)
        })
        .catch(err => {
            res.send(err)
        })
});


// Modifica el producto con id: id. Retorna 400 si los campos enviados no son correctos.

// Retorna 200 si se modificó con exito, y retorna los datos del producto modificado.


//S27

server.delete('/:id', (req, res) => {
	const productId = req.params.id;
	Product.destroy({ where: { id: productId } })
		.then(resolve => {
			res.status(200).send('Se elimino el producto con exito')
		})
})


module.exports = server;