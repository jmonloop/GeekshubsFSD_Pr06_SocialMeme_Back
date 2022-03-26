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
//http://localhost:5500/users/get
router.get('/get', UsersController.get);

//Delete user
//http://localhost:5500/users/delete
router.delete('/profile/delete', UsersController.delete);
// router.delete('/profile/delete', auth, UsersController.delete);

//Update user email
//http://localhost:5500/users/updateEmail
router.put('/updateEmail', UsersController.updateEmail);


//Get user rating: returns rounded rating number
//http://localhost:5500/users/rating/userId
router.get('/getRating', UsersController.getRating);

//Follow another user
//http://localhost:5500/users/actions/follow
router.put('/actions/follow', UsersController.follow);
// router.put('/actions/follow', auth, UsersController.follow);

//Unfollow another user
//http://localhost:5500/users/actions/unfollow
router.put('/actions/unfollow', UsersController.unfollow);
// router.put('/actions/unfollow', auth, UsersController.unfollow);





//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;