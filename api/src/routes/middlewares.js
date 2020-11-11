const jwt = require('jwt-simple');
const moment = require('moment');


const checkToken = (req, res, next) => {

    const userToken = req.cookies.cookieHash
    console.log("userToken",userToken)
    let payload = {};
    console.log('payloadVacio', payload)

    try {
        payload = jwt.decode(userToken, 'frase_secreta');            //me decodifica el token con la frase secreta
        console.log('payload desde el middleware', payload)         // y me trae en el payload el userId y userRole
        if (payload.expiredAt < moment().unix()) {
            return res.send({ error: 'El token ha expirado' });
        }
        // req.usuarioId = payload.usuarioId;
        else if (payload.userRole === 'admin') {
            next();
            return 
        }
        else {
            res.send({ message: 'No estas autorizado a acceder a esta pagina' })
        }
    } catch {
        error => res.send({message: 'error de autorizacion'})
    }
}

module.exports = {
    checkToken: checkToken
}




// const checkToken = (req, res, next) => {

//     const userToken = req.cookies.cookieHash

//     let payload = {};
//     console.log('payloadVacio', payload)
//     try {
//         payload = jwt.decode(userToken, 'frase_secreta');            //me decodifica el token con la frase secreta
//         console.log('payload desde el middleware', payload)
//         // y me trae en el payload el userId
//         if (payload.expiredAt < moment().unix()) {
//             return res.send({ error: 'El token ha expirado' });
//         }
//         // req.usuarioId = payload.usuarioId;
//         else if (payload.userRole === 'admin') {
//             next();
//         }
//         else {
//             res.status(403).send({ message: 'No estas autorizado a acceder a esta pagina' })
//         }
//     } catch (err) {
//         return res.send({ error: 'El token es incorrecto' });
//     }


// }
