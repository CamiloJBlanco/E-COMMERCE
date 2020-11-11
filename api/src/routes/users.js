const server = require('express').Router();
const bcrypt = require('bcryptjs');
const { User } = require('../db.js');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const { Cartorder } = require('../db.js');
const { checkToken } = require('./middlewares');
const { response } = require('../app.js');


server.get('/login', function (req, res) {
  res.send('login');
});


server.post('/register', [
  check('firstname', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('email', 'el email debe ser valido').isEmail(),
  //check('role', 'debe logearse como guest, admin o logged').not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errores: errors.array() });
  }

  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const user = await User.create(req.body);

  res.send(user);
});

//AUTENTICACION
server.post('/login', async (req, res) => {

  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    console.log('USER', user)
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    console.log('user.password', user.password);
    if (iguales) {
      const cookieToken = createToken(user);
      console.log('cookieToken=', cookieToken);
      res.cookie('cookieHash', cookieToken, { expires: new Date(Date.now() + 900000), httpOnly: true });
      //  res.status(200).send({ succes: cookieToken});

      if (user.role === 'admin') {
        res.status(200).send({ succes: cookieToken, user });
      }
      else {
        res.status(202).send({ succes: cookieToken, user });
      }


    } else {
      res.send({ error: 'Error en usuario y/o contraseña1' });
    }
  } else {
    res.send({ error: 'Error en usuario y/o contraseña2' });
  }


});

server.post('/logout', async (req, res) => {
  console.log('REQ', req.cookies.cookieHash)
  const cookieToken = req.cookies.cookieHash;
  console.log("cookieToken", cookieToken)

  res.cookie('cookieHash', cookieToken, { expires: new Date(Date.now() + 1000), httpOnly: true });
  res.send("se deslogueo correctamente")

});

server.post('/reset-password', function (req, res) {
  const email = req.body.email
  User
    .findOne({
      where: { email: email },//checking if the email address sent by client is present in the db(valid)
    })
    .then(function (user) {
      if (!user) {
        return res, 'No user found with that email address.'
      }
      ResetPassword
        .findOne({
          where: { userId: user.id, status: 0 },
        }).then(function (resetPassword) {
          if (resetPassword)
            resetPassword.destroy({
              where: {
                id: resetPassword.id
              }
            })
          token = bcrypt.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
          bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
            ResetPassword.create({
              userId: user.id,
              resetPasswordToken: hash,
              expire: moment.utc().add(config.tokenExpiry, 'seconds'),
            }).then(function (item) {
              if (!item)
                return throwFailed(res, 'Oops problem in creating new password record')
              let mailOptions = {
                from: '"<admin>" admin@admin.com',
                to: user.email,
                subject: 'Reset your account password',
                html: '<h4><b>Reset Password</b></h4>' +
                  '<p>To reset your password, complete this form:</p>' +
                  '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
                  '<br><br>' +
                  '<p>--Team</p>'
              }
              let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
              if (mailSent) {
                return res.json({ success: true, message: 'Check your mail to reset your password.' })
              } else {
                return throwFailed(error, 'Unable to send email.');
              }
            })
          })
        });
    })
})



const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    userRole: user.role,
    createdAt: moment().unix(),
    expiredAt: moment().add(5, 'minutes').unix()
  }
  return jwt.encode(payload, 'frase_secreta');

}
//cookie, 

// res.cookie('cookieHash', hashpass, { expires: new Date(Date.now() + 900000), httpOnly: true }); 

// seteo de cookie
// if (req.cookies && req.cookies.cookieHash && req.cookies.cookieHash == hashpass) {
//   res.send({ chk: true, msj: "Cookies Correctas" });
//   } else {
//   res.send({ chk: false, error: true, msj: "Cookies Invalidas" });
//   } 

server.get('/', checkToken, (req, res) => {
  console.log("Cookies desde el get /users:  ", req.cookies);
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(error => { res.send('inhabilitado') });
});





// server.post('/', (req, res) => {
//   const { firstname, lastname, phone, address, role, email, password } = req.body;
//   User.create({
//     firstname: firstname,
//     lastname: lastname,
//     //  phone: phone,
//     //  address: address,
//     // role: role,
//     email: email,
//     password: password,
//   }).then(created => {

//     Cartorder.create({
//       userId: created.dataValues.id
//     })
//     console.log('CREATED', created.dataValues.id);
//     res.send(created)
//     console.log('usuario cargado');
//   })
//     .catch(err => {
//       res.send(err)
//       console.log('hay error')
//     })
// });



server.put('/:id', (req, res) => {
  const usersId = req.params.id;
  const changed = req.body;

  User.findOne({ where: { id: usersId } })
    .then(updated => {
      updated.update(changed),
        res.send('user was modified');
    })
    .catch(error => {
      res.send(error)
    })
});

server.delete('/:id', (req, res) => {
  const usersId = req.params.id;
  User.destroy({ where: { id: usersId } })
    .then(deleted => {
      res.status(200).send('Se elimino el user con exito')
    })
    .catch(err => {
      res.send(err)
    })
})



module.exports = server;