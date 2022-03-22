//Importo la clase express y la guardo en la variable express (siempre igual)
const express = require('express');
//ejecuto el método Router() de express (siempre igual)
const router = express.Router();
//Importo el fichero ../middlewares/auth para limitar ciertos endpoints que requieren de autorización
const auth = require("../middlewares/auth");
//Importo el fichero ../middlewares/isAdmin para limitar endpoints por rol de usuario
const isAdmin = require("../middlewares/isAdmin");

//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const UsersController = require('../controllers/UsersController');


// http://localhost:5500/usuarios/register (usando un POST).
// Recibe por body un json con los datos de registro de usuario y los guarda en la BBDD
router.post('/register', UsersController.register);

//http://localhost:5500/usuarios/login (usando un POST)
//Recibe por body un json con los datos para hacer login y loguea si el usuario existe en la BBDD(las condiciones se ven en la función controladora)
router.post('/login', UsersController.login);

//http://localhost:5500/usuarios/profile/idUsuario (usando un PUT)
//Recibe por URL/params un id de usuario y modifica su perfil solo si el usuario está logueado (auth)
router.put('/profile/:id', auth, UsersController.edit);

//http://localhost:5500/usuarios/idUsuario (usando un DELETE)
//Recibe por URL/params un id de usuario y lo borra de la BBDD por ID solo si el usuario está logueado (auth)
router.delete('/profile/:id', auth, UsersController.delete);















//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;