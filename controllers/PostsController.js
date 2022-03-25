//Importo el modelo Usuario para poder escribir en la tabla Usuario de la BBDD
const Post = require('../models/post.js');
//Importo la clase bcrypt para poder encriptar
const bcrypt = require('bcrypt');
//Importo el fichero ../config/auth.js para poder darle los parámetros al encriptado
const authConfig = require('../config/auth');
//Importo la clase jsonwebtoken para generar un token al hacer login
const jwt = require('jsonwebtoken');
const { default: axios } = require('axios');
//Declaro el objeto PostsController (siempre igual para cada controller)
const PostsController = {};
let currentToken;
const moment = require('moment')



//REFRESH IMGUR TOKEN
//Refresh IMGUR token for accessing to any imgur endpoint
PostsController.refreshToken = async (req, res) => {
    let body = {
        refresh_token: `ea853491f044c26ed467ab9e2c421e009bfe82b7`,
        client_id: `94d8c15128665c4`,
        client_secret: `17eecea1afda036ea8da37845c60868ff932749d`,
        grant_type: `refresh_token`
    }


    try {
        let results = await axios.post(`https://api.imgur.com/oauth2/token`, body)
        res.send(results.data)

        currentToken = results.data.refresh_token;
    } catch (error) {
        console.log("error", error)
        res.send(error)
    }
   
};

//CREATE POST
PostsController.create = async (req, res) => {

    let ownerId = req.body.ownerId;
    let ownerNickname = req.body.ownerNickname;
    let title = req.body.title;
    let img = req.body.img;
    let text = req.body.text;
    let rating = [];
    let keywords = req.body.keywords;
    let comments = [];

    try {
        Post.create({
            ownerId: ownerId,
            ownerNickname: ownerNickname,
            title: title,
            img: img,
            text: text,
            rating: rating,
            keywords: keywords,
            comments: comments
        }).then(elmnt => {
            res.send(elmnt);
        })
    } catch (error) {
        console.log("Error creating post", error);
        res.send("Error creating post", error);
    }
};

//DELETE POST
PostsController.delete = async (req, res) => {

    let id = req.body.id;

    try {
       await Post.findByIdAndDelete(id)
        .then(elmnt=>{
            res.send(elmnt)
        })
    } catch (error) {
        console.log("Error deleting post", error);
        res.send("Error deleting post", error);
    }
};




















//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = PostsController;