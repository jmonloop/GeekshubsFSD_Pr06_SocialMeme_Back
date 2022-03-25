//Importo la clase express y la guardo en la variable express (siempre igual)
const express = require('express');
//ejecuto el método Router() de express (siempre igual)
const router = express.Router();
//Importo el fichero ../middlewares/auth para limitar ciertos endpoints que requieren de autorización
const auth = require("../middlewares/auth");
//Importo el fichero ../middlewares/isAdmin para limitar endpoints por rol de usuario
const isAdmin = require("../middlewares/isAdmin");

//Importo el fichero UsuariosController y lo guardo en la variable UsuariosController. Luego habrá que crearlo.
const PostsController = require('../controllers/PostsController');

//REFRESH IMGUR TOKEN (spare)
// http://localhost:5500/posts/refreshToken
router.post('/refreshToken', PostsController.refreshToken);

//CREATE POST: creates post in db
// http://localhost:5500/posts/create
router.post('/create', PostsController.create);

//GET POST
// http://localhost:5500/posts/get/postId
router.get('/get/:id', PostsController.get);

//DELETE POST: delete post
// http://localhost:5500/posts/delete
router.delete('/delete', PostsController.delete);
// router.post('/create', auth, PostsController.create);

//UPDATE POST: update post
// http://localhost:5500/posts/update
router.put('/update', PostsController.update);
// router.put('/update', auth, PostsController.update);

//UPDATE POST TITLE
// http://localhost:5500/posts/update/title
router.put('/update/title', PostsController.updateTitle);
// router.put('/update/title', auth, PostsController.update/title);

//UPDATE POST IMAGE
// http://localhost:5500/posts/update/img
router.put('/update/img', PostsController.updateImg);
// router.put('/update/img', auth, PostsController.update/img);

//UPDATE POST IMAGE
// http://localhost:5500/posts/update/text
router.put('/update/text', PostsController.updateText);
// router.put('/update/text', auth, PostsController.update/text);

//RATE
// http://localhost:5500/posts/update/rate
router.put('/update/rate', PostsController.rate);
// router.put('/update/rate', auth, PostsController.update/rate);

//GET RATE
// http://localhost:5500/posts/getRate/postId
router.get('/getRate/:id', PostsController.getRate);
// router.put('/update/rate', auth, PostsController.update/rate);












//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;