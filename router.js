//Importo método router() de la clase express
const router = require('express').Router();

//Importo los ficheros de vistas
const UsersRouter = require('./views/UsersRouter');
const PostsRouter = require('./views/PostsRouter');

//Ruteo cada fichero de vista con un endpoint
router.use('/users', UsersRouter);
router.use('/posts', PostsRouter);

//Exporto router
module.exports = router;