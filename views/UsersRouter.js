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

//Register
// http://localhost:5500/users/register
router.post('/register', UsersController.register);

//Login
//http://localhost:5500/users/login
router.post('/login', UsersController.login);

//Get user
//http://localhost:5500/users/profile/userId
router.get('/profile/:id', UsersController.get);

//Edit user
//http://localhost:5500/users/profile/userId
router.put('/profile/:id', auth, UsersController.edit);

//Delete user
//http://localhost:5500/users/userId
router.delete('/profile/:id', auth, UsersController.delete);




//Get user rating: returns rounded rating number
//http://localhost:5500/users/rating/userId
router.get('/profile/rating/:id', UsersController.getRating);

//Follow another user
//http://localhost:5500/users/actions?followed=followdUserId&owner=userId
router.put('/actions', auth, UsersController.follow);









//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;