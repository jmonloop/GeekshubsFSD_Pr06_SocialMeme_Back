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

router.post('/uploadImg', auth, PostsController.uploadImg);

//CREATE POST: creates post in db
// http://localhost:5500/posts/create
router.post('/create', auth, PostsController.create);

//GET POST
// http://localhost:5500/posts/get
router.get('/get', PostsController.get);

//GET 10 POSTS
// http://localhost:5500/posts/get10
router.get('/get10', PostsController.get10);

//DELETE POST: delete post
// http://localhost:5500/posts/delete
router.delete('/delete', auth, PostsController.delete);


//UPDATE POST: update whole post
// http://localhost:5500/posts/update
router.put('/update', auth, PostsController.update);


//UPDATE POST TITLE
// http://localhost:5500/posts/actions/updateTitle
router.put('/actions/updateTitle', auth, PostsController.updateTitle);


//UPDATE POST IMAGE
// http://localhost:5500/posts/actions/updateImg
router.put('/actions/updateImg', auth, PostsController.updateImg);


//UPDATE POST TEXT
// http://localhost:5500/posts/actions/updateText
router.put('/actions/updateText', auth, PostsController.updateText);


//ADD RATE
// http://localhost:5500/posts/actions/addRating
router.put('/actions/addRating', auth, PostsController.addRating);


//GET RATE
// http://localhost:5500/posts/actions/getRate
router.get('/actions/getRating', PostsController.getRating);


//UPDATE POST KEYWORDS
// http://localhost:5500/posts/actions/updateKeywords
router.put('/actions/updateKeywords', auth, PostsController.updateKeywords);


//ADD COMMENT
// http://localhost:5500/posts/actions/addComment
router.put('/actions/addComment', auth, PostsController.addComment);

//GET ALL COMMENTS
// http://localhost:5500/posts/actions/getAllComments
router.get('/actions/getAllComments', PostsController.getAllComments);

//GET COMMENT
// http://localhost:5500/posts/actions/getComment
router.get('/actions/getComment', PostsController.getComment);

//DELETE COMMENT
// http://localhost:5500/posts/actions/deleteComment
router.put('/actions/deleteComment', auth, PostsController.deleteComment);


//UPDATE COMMENT
// http://localhost:5500/posts/actions/updateComment
router.put('/actions/updateComment', auth, PostsController.updateComment);


//ADD COMMENT RATING
// http://localhost:5500/posts/actions/addCommentRating
router.put('/actions/addCommentRating', auth, PostsController.addCommentRating);


//GET COMMENT RATING
// http://localhost:5500/posts/actions/getCommentRating
router.get('/actions/getCommentRating', PostsController.getCommentRating);


//ADD COMMENT ANSWER
// http://localhost:5500/posts/actions/addCommentAnswer
router.put('/actions/addCommentAnswer', auth, PostsController.addCommentAnswer);


//DELETE COMMENT ANSWER
// http://localhost:5500/posts/actions/deleteCommentAnswer
router.put('/actions/deleteCommentAnswer', auth, PostsController.deleteCommentAnswer);


//UPDATE COMMENT ANSWER
// http://localhost:5500/posts/actions/updateCommentAnswer
router.put('/actions/updateCommentAnswer', auth, PostsController.updateCommentAnswer);


//GET COMMENT ANSWER
// http://localhost:5500/posts/actions/getCommentAnswer
router.get('/actions/getCommentAnswer', PostsController.getCommentAnswer);


//GET ALL COMMENT ANSWERS
// http://localhost:5500/posts/actions/getAllCommentAnswers
router.get('/actions/getAllCommentAnswers', PostsController.getAllCommentAnswers);


//GET POSTS BY USER
// http://localhost:5500/posts/actions/getPostsByUser
router.get('/actions/getPostsByUser', PostsController.getPostsByUser);


//FIND POSTS
// http://localhost:5500/posts/actions/find
router.get('/actions/find', PostsController.find);

//FIND POSTS bY USER ID
// http://localhost:5500/posts/actions/find
router.get('/actions/findByUser', PostsController.findByUser);

//FIND COMMENTS ARR BY USER ID
// http://localhost:5500/posts/actions/find
router.get('/actions/findCommentsByUser', PostsController.findCommentsByUser);

//FIND ANSWERS ARR BY USER ID
// http://localhost:5500/posts/actions/find
router.get('/actions/findAnswersByUser', PostsController.findAnswersByUser);

//Exporto router para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = router;