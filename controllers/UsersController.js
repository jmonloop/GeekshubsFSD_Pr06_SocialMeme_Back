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





//USER REGISTER
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

//Método post para loguearse metiendo los datos por body y generar un token nuevo en caso de login satisfactorio.
//El usuario debe estar registrado en la BBDD con un email y password válidos
UsersController.login = async (req, res) => {
    let email = req.body.email;    // Cogemos el email del body
    let password = req.body.password; //cogemos el password del body
    
   await User.find({                   //Buscamos el email para verificar que ese usuario está registrado en nuestra BBDD
         email: email   //Si el atributo email coincide con el campo email del body...
        
    }).then(elmnt => {  
       //(callback del método findOne que en este caso es lo que haya encontrado)
        if(!elmnt){   //..si no existe en nuestra BBDD...
            res.send("Invalid email or password");    //..muestra mensaje de que el login es inválido
        }else {   //Si sí que existe..
            if (bcrypt.compareSync(password, elmnt[0].password)) { //Compara contraseña que le manda el body con la que tiene guardada ese usuario en la BBDD (desencriptándola)
                let token = jwt.sign({ usuario: elmnt }, authConfig.secret, { //Si son iguales, genera un token
                    expiresIn: authConfig.expires //que expira en un tiempo determinado según lo que haya en ../config/auth
                });
                //Mensaje de confirmación de login satisfactorio
                let loginOkMessage = `welcome again ${elmnt[0].nickname}`
                res.json({   // y envía por Postman...
                    loginOkMessage, //el mensaje
                    user: elmnt, //el usuario
                    token: token //y el token generado
                })
            } else {
                res.status(401).json({ msg: "Invalid email or password" }); //si no son iguales, login inválido
            }
        };
    })
};

//MÉTODO GET PARA SACAR UN ELEMENTO DE LA BBDD BUSCÁNDOLO POR NICKNAME EN LA URL
UsersController.get = async (req, res) => {
    //Búsqueda comparando un campo

    try {
        await User.find({ 
            _id : req.params.id 
        })
        .then(elmnt => {
            res.send(elmnt)
        })
    } catch (error) {
        res.send("backend getUser error: ", error)
    }

   

}

//MÉTODO PUT PARA MODIFICAR EL PERFIL DE UN USUARIO POR ID
UsersController.edit = async (req, res) => {
    //Capturo el id que llega por params
    let id = req.params.id;
    try {
        //Función updateOne de mongoose
        User.updateOne(
            //Primer argumento: objeto donde se compara la _id del documento con el id que llega por params para saber qué documento vamos a modificar
            {_id : id},{
                //Segundo argumento: objeto que lleva como key '$set' para asignar los nuevos valores a cada campo
                $set: {
                    //Y como valor un objeto con todos los campos de la tabla y su asignación por body
                    email: req.body.email,
                    nickname: req.body.nickname,
                    rating : req.body.rating,
                    avatar : req.body.avatar,

                    //Metemos todos los campos susceptibles de ser modificados pero luego en el body solo enviaremos los que necesitemos modificar. Por ejemplo:
                                        //{
                                        //    "email":"JaviMOD",
                                        //    "nickname":"jmonleone",
                                        //    "rating":32,
                                        //  "avatar": "URLimagenfotoperfil"
                                        // }
                    //Y solo modificaremos nombre, apellido y edad de ese documento
                }
            }
        )//If promise is done, response the edited user
        .then(elmnt => {
            User.find({
                _id : id
            }).then(user => {
                res.send(user)
            })
        })
    } catch (error) {
        res.send("backend edit user error: " ,error);
    }
}

//MÉTODO DELETE PARA BORRAR UN USUARIO DE LA BBDD POR ID
UsersController.delete = async (req, res) => {
    //Busco el usuario en mi BBDD
    try {
        User.find({
            _id : req.params.id
            //Se resuelve la promesa de mongoose
        }).then(elmnt => {
            //Si devuelve un valor que no sea array vacío...
            if(elmnt.length !== 0) {
                //..almaceno el valor para mostrarlo después de borrarlo
                let deletedUser = elmnt
                //..borro el elemento de la BBDD
                User.remove({
                    _id : req.params.id
                    //Una vez se cumple la promesa de borrarlo...
                }).then(x => {
                    //Muestro mensaje con el nombre del usuario que se ha borrado
                    res.send(deletedUser)
                })
                // //Borrar en cascada:
                // //Busco posts asociados a ese id de usuario
                // Post.find({
                //     userId: req.params.id
                // }).then(elmnt => {
                //     //Si los encuentro, borro todos los posts con ese id de usuario
                //     if(elmnt.length !== 0) {
                //         Posts.deleteMany({
                //             userId: elmnt[0].userId
                //             //El then, aunque esté vacío, es obligatorio para que ejecute el método
                //         }).then(x =>{

                //         })
                //     }

                // })
                
                
                //Si devuelve null quiere decir que no existen usuarios con esa id
            } else {
                res.send('There are no users with that id in the database')
            }
        })

    } catch (error) {
        res.send("backend delete user and his posts error: " ,error);
    };
};






























//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = UsersController;