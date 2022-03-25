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
router.put('/actions/addRating', PostsController.addRating);


//GET RATE
// http://localhost:5500/posts/actions/getRate/postId
router.get('/actions/getRating/:id', PostsController.getRating);


//UPDATE POST KEYWORDS
// http://localhost:5500/posts/actions/updateKeywords
router.put('/actions/updateKeywords', PostsController.updateKeywords);


//ADD COMMENT
// http://localhost:5500/posts/actions/addComment
router.put('/actions/addComment', PostsController.addComment);

//GET ALL COMMENTS
// http://localhost:5500/posts/actions/getAllComments
router.get('/actions/getAllComments', PostsController.getAllComments);

//GET COMMENT
// http://localhost:5500/posts/actions/getComment
router.get('/actions/getComment', PostsController.getComment);

//DELETE COMMENT
// http://localhost:5500/posts/actions/deleteComment
router.put('/actions/deleteComment', PostsController.deleteComment);


//UPDATE COMMENT
// http://localhost:5500/posts/actions/updateComment
router.put('/actions/updateComment', PostsController.updateComment);


//ADD COMMENT RATING
// http://localhost:5500/posts/actions/addCommentRating
router.put('/actions/addCommentRating', PostsController.addCommentRating);


//GET COMMENT RATING
// http://localhost:5500/posts/actions/getCommentRating
router.get('/actions/getCommentRating', PostsController.getCommentRating);


//ADD COMMENT ANSWER
// http://localhost:5500/posts/actions/addCommentAnswer
router.put('/actions/addCommentAnswer', PostsController.addCommentAnswer);


//DELETE COMMENT ANSWER
// http://localhost:5500/posts/actions/deleteCommentAnswer
router.put('/actions/deleteCommentAnswer', PostsController.deleteCommentAnswer);


//UPDATE COMMENT ANSWER
// http://localhost:5500/posts/actions/updateCommentAnswer
router.put('/actions/updateCommentAnswer', PostsController.updateCommentAnswer);


//GET COMMENT ANSWER
// http://localhost:5500/posts/actions/getCommentAnswer
router.get('/actions/getCommentAnswer', PostsController.getCommentAnswer);


//GET ALL COMMENT ANSWERS
// http://localhost:5500/posts/actions/getAllCommentAnswers
router.get('/actions/getAllCommentAnswers', PostsController.getAllCommentAnswers);



//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;