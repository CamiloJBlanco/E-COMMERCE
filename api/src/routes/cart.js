const server = require('express').Router();

const { urlencoded } = require('body-parser');
const { Cartorder } = require('../db.js');
const { Product } = require('../db.js');
const { Orderline } = require('../db.js');
const { User } = require('../db.js');

// TRAE USUARIO POR ID

server.get('/:id', function (req, res) {
	const userId = req.params.id;
	const user = User.findByPk(userId)
		.then(user => {
			if (user) {
				res.send({ user })
			} else {
				res.status(404).send({ message: 'user not Found' })
			};
		})

})

// EL USUARIO AGRUEGUE UN PRODUCTO AL CARRITO

// server.post('/:id/cart', function (req, res, next) {
//   const { id } = req.params;
//   const { productId } = req.body;
//   console.log('userId', id)
//   console.log('productId', productId)

//   Promise.all([
//     Cartorder.findAll({
//       where: {
//         // userId: id,
//         state: "carrito"
//       }
//     }),
//     Product.findByPk(productId),
//   ])
//     .then(results => {
//       // console.log('results', results)
//       // console.log('results otros', results)
//       console.log('VER', results[1])

//       Orderline.create({
//         cartorderId: results[0][0].dataValues.id,
//         productId: results[1].dataValues.id,
//         quantity: 1,
//         price: results[1].dataValues.price
//       })
//     })
//     .then(result => res.status(201).json(result))
//     .catch(e => { res.send(e) })
// })
// .delete((req, res, next) => {
//     const { userId } = req.params;
//     Cartorder.findAll({
//         where: {
//             userId: userId,
//             state: "carrito"
//         }
//     })
//     .then(results => {
//       Orderline.destroy({
//             where: {
//               cartorderId: results[0].id,
//             }
//         });
//     })
//     .then(() => res.status(201).send("Productos eliminados"))
//     .catch(e => { res.send(e) })
// });



// server.put('/:id/cart', (req, res, next) => {
//     const { userId } = req.params;
//     const { quantity, productId } = req.body;
//     Promise.all([
//       Cartorder.findAll({
//             where: {
//                 userId: userId,
//                 state: "carrito"
//             }
//         }),
//         Product.findByPk(productId),
//     ])
//         .then(results => {

//             if (quantity > 0 && quantity <= results[1].stock) {
//               Orderline.update({
//                     quantity: quantity,
//                     price: results[1].price * quantity,
//                 }, {
//                     where: {
//                         cartorderId: results[0][0].id,
//                         productId: results[1].id,
//                     }
//                 });
//             }
//         })
//         .then(() => res.status(201).send(true))
//         .catch(e => { res.send(e) })
// })




//NUETRO CODE ANTERIOR :(

// server.post("/:id/cart", (req, res) => {
//   const { price, quantity, productId } = req.body; //Me traigo los valores del body
//   const userId = req.params.id; //me traigo el id del usuario

//   console.log('esto', productId)

//   !productId && res.send("hace falta producto");

//   Promise.all([
//     Cartorder.findOne({ where: { state: "carrito" } }),
//     Product.findByPk(productId),
//     Orderline.findOne({ where: { productId: productId }})
//   ])
//     .then(carrito => {
//       console.log('carrito[0]', carrito[0].dataValues.id)
//       console.log('carrito[1]', carrito[1].dataValues.id)
//       console.log('carrito[2]', carrito[2])

//       if (!carrito[1].dataValues.id) { 

//         Orderline.create({
//           cartorderId: carrito[0].dataValues.id,
//           price: carrito[1].dataValues.price,
//           quantity,
//           productId
//         });
//        }

//        // PREGUNTAR ESTO A WALLY
//       //  else{
//       //    console.log('se updatea')
//       //   Orderline.update({
//       //     cartorderId,
//       //     quantity: quantity+1,
//       //     price: carrito[0].dataValues.price*quantity,
//       //     productId
//       //   }, {
//       //     where: {
//       //       productId: productId,
//       //       cartorderId: cartorderId
//       //     }
//       //   })
//       // }

//       // else {
//       //   Cartorder.create({
//       //     userId: userId,
//       //     price: price,
//       //     quantity: quantity,
//       //   })
//       //     .then((cartorder) => {
//       //       cartorder.addProduct(productId).then(
//       //         () => res.send(cartorder),
//       //         (err) =>
//       //           res.send("el producto no existe")
//       //       );
//       //     })
//       //     .catch((err) => {
//       //       res.send(err);
//       //     });
//       // };
//     })
//     .then(result => res.status(201).json(result))
//     .catch(e => { res.send(e) })
// })


// CODE AGUS MODIFICADO - NUESTRO - ANTERIOR

server.post('/:id/cart', (req, res) => {
	// busca si existe una orden con el userid y con state 'carrito'
	Cartorder.findOne({
		where: { state: 'carrito', userId: req.params.id },
	}).then(cartorder => {
		console.log(cartorder);
		//si no se cumple la condicion del where crea una nueva orden
		if (!cartorder) {
			Cartorder.create({
				userId: req.params.id,
				price: req.body.price
			}).then(newOrder => {
				//le agrega una producto a la orden nueva
				Product.findByPk(req.body.productId)
					.then(product => {
						Orderline.create({
							price: product.price,
							quantity: 1,
							productId: product.id,
							cartorderId: newOrder.id,
						}).then(orderline => res.send(orderline));
					});
			});
		}
		else {
			//si existe una orden uncreated y con el id del user
			// le agrega al order line de esa orden el id el producto
			Product.findByPk(req.body.productId)
				.then(product => {
					Orderline.findOne({
						where: { productId: product.id, cartorderId: cartorder.id },
					}).then(orderline => {
						if (!orderline) {
							Orderline.create({
								price: product.price,
								quantity: product.quantity,
								productId: product.id,
								cartorderId: cartorder.id,
							}).then(orderline => {
								cartorder.update({ quantity: Number(cartorder.quantity) + 1, price: Number(cartorder.price) + Number(req.body.price) })
								res.send(orderline)
							}
							);
						} else {
							orderline.update({ quantity: Number(orderline.quantity) + 1 });
							cartorder.update({ quantity: Number(cartorder.quantity) + 1, price: Number(cartorder.price) + Number(req.body.price) })
						}
					});
				});
		}
	}).then(tarea => {
		res.send('tarea completada')
	}).catch(error => {
		res.send(error.message)
	})
});

// UPDATE QUANTITY:
// if (quantity > 0 && quantity <= carrito[1].stock) {
//   Orderline.update({
//     quantity: quantity,
//     price: carrito[1].price * quantity,
//   }, {
//     where: {
//       cartorderId: carrito[0].dataValues.id,
//       productId: carrito[1].dataValues.id,
//     }
//   }).then(() => res.send(carrito))
//     .catch(err => {
//       res.send("el producto no existe")
//     }
//     );
// }
// }


// 39 - RETORNA TODOS LOS ITEMS DEL CARRITO

server.get('/:id/cart', (req, res) => {
	const { id } = req.params;
	Cartorder.findAll({
		include: {
			model: Product,
		},
		where: {
			userId: parseInt(id),
			state: "carrito",
		},
	}) //busca todos los items
		.then((items) => {
			res.send(items);
		})
		.catch((err) => res.send(err));
});


// TRAE TODAS LAS ORDERLINES DE UN USUARIO

server.get('/:id/orders', (req, res) => {
	const { id } = req.params;
	Cartorder.findAll({
		include: {
			model: Product,
		},
		where: { userId: parseInt(id) },
	}) //busca todos los items
		.then((items) => {
			res.send(items);
		})
		.catch((err) => res.send(err));
});

// 40 - VACIA EL CARRITO // (para el usuario borra /// para el ADMIN cancela la orden)

// server.delete('/:id/cart', (req, res) => {
//   const { id } = req.params;

//   Cartorder.update(
//     {
//       state: "cancelada",
//     },
//     {
//       where: { userId: parseInt(id), state: "carrito" },
//     }
//   )
//     .then((up) =>
//       res.send(
//         up[0] ? "se cancelo la compra" : "no se encontraron los productos"
//       )
//     )
//     .catch((err) => res.send(err));
// });



// BORRA EL CARRITO POR COMPLETO (PARA LIMPIEZA)

// server.delete('/:id/cart', (req, res) => {
// 	const userId = req.params.id;
// 	Cartorder.destroy({ where: { userId: userId } })
// 		.then(resolve => {
// 			res.status(200).send('Se vacio el carrito con exito')
// 		})
// })



server.delete('/:id/cart', (req, res, next) => {
	const { id } = req.params;
	const { productId } = req.body;
	Cartorder.findOne({ where: { userId: id, state: "carrito" } })
		.then(cartorder => {
			Orderline.findOne({ where: { productId: productId } })
				.then(orderline => {
					cartorder.update({
						quantity: Number(cartorder.quantity) - Number(orderline.quantity),
						price: Number(cartorder.price) - Number(orderline.price * orderline.quantity)
					})
					orderline.destroy({ where: { productId: productId } })
				})
		})
		.then(() => res.status(201).send("Producto eliminados"))
		.catch(e => { res.send(e) })
});


// 41 - EDITA LAS CANTIDADES DEL CARRITO

server.put('/:id/cart', (req, res) => {
	const { id } = req.params;
	const { productId, quantity, cartorderId } = req.body;

	(!cartorderId || typeof cartorderId === "string") &&
		res.send("el order id es invalido");

	Orderline.update(
		{
			quantity: Number(quantity - 1)
		},
		{
			where: {
				cartorderId: cartorderId,
				productId: productId,
			},
		}
	),
		Product.findByPk(productId)
			.then(product => {
				console.log('product', product)

				Cartorder.findOne({
					where: { state: 'carrito', userId: id },
				}).then(cartorder => {
					console.log(cartorder);
					Cartorder.update(
						{
							quantity: Number(cartorder.quantity - 1),
							price: Number(cartorder.price - product.price)
						},
						{
							where: {
								userId: id
							},
						}
					)
				})
			})
			.then((up) => res.send(up[0] ? "se edito la cantidad" : "no se edito nada"))
			.catch((err) => res.send(err));
});

module.exports = server;

