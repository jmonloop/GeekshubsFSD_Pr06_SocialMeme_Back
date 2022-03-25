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


//UPDATE POST: update whole post
// http://localhost:5500/posts/update
router.put('/update', PostsController.update);


//UPDATE POST TITLE
// http://localhost:5500/posts/actions/updateTitle
router.put('/actions/updateTitle', PostsController.updateTitle);


//UPDATE POST IMAGE
// http://localhost:5500/posts/actions/updateImg
router.put('/actions/updateImg', PostsController.updateImg);


//UPDATE POST TEXT
// http://localhost:5500/posts/actions/updateText
router.put('/actions/updateText', PostsController.updateText);


//ADD RATE
// http://localhost:5500/posts/actions/addRate
router.put('/actions/addRate', PostsController.addRate);


//GET RATE
// http://localhost:5500/posts/actions/getRate/postId
router.get('/actions/getRate/:id', PostsController.getRate);


//UPDATE POST KEYWORDS
// http://localhost:5500/posts/actions/updateKeywords
router.put('/actions/updateKeywords', PostsController.updateKeywords);


//ADD COMMENT
// http://localhost:5500/posts/actions/addComment
router.put('/actions/addComment', PostsController.addComment);

//DELETE COMMENT
// http://localhost:5500/posts/actions/deleteComment
router.put('/actions/deleteComment', PostsController.deleteComment);






//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;