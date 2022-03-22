//Importo el modelo Usuario para poder escribir en la tabla Usuario de la BBDD
const  User  = require('../models/user.js');
//Importo la clase bcrypt para poder encriptar
const bcrypt = require('bcrypt');
//Importo el fichero ../config/auth.js para poder darle los parámetros al encriptado
const authConfig = require('../config/auth');
//Importo la clase jsonwebtoken para generar un token al hacer login
const jwt = require('jsonwebtoken');
//Declaro el objeto UsuariosController (siempre igual para cada controller)
const UsersController = {};





//MÉTODO POST PARA ESCRIBIR EN LA BASE DE DATOS
UsersController.register = async (req, res) => {
    
    //Declaramos variables para recoger los datos que llegarán por body en formato json.
    //el nombre de la variable por convención suele ser el mismo que tiene cada atributo (columna) en la tabla User de mongoDB
    let email = req.body.email; //lo que va después de "body" (".name" en este caso) es como se llama cada key que recibe desde body
    //Encriptamos el campo password antes de guardarlo en la BBDD
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds)); 
    let nickname = req.body.nickname;
    let rol = req.body.rol;
    let rating = req.body.rating;
    let avatar = req.body.avatar;

    //Para estas variables luego haremos post desde Postman con este json en el body:
    // {
    //     "email":"ivan@gmail.com",
    //     "password":"1234",
    //      "nickname": "ivandafacker"
    // }

    //Comprobación de errores.....
    //Aquí haríamos console.logs en caso de fallo
    //Guardamos en mongo el usuario


    //Antes de registrar el usuario comprobamos si ya existe en la BBDD haciendo find con email o nickname
    await User.find({
        $or: [
            {email: email},
            {nickname: nickname}
        ]
    }).then(resultado => {
        if(resultado.length == 0) {
            User.create({
                email: email,
                password: password,
                nickname: nickname,
                rol: rol,
                rating: rating,
                avatar: avatar 
            }).then(elmnt => {
                res.send(`${elmnt.nickname} you have been registered succesfully`)
            })
        }else {
            res.send(`This user already exists in the database`)
        }
    })
};




































//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = UsersController;