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

//GET POST
PostsController.get = async (req, res) => {

    let id = req.params.id;


    try {
        await Post.find({
            _id: id
        })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        res.send("backend getPost error: ", error)
    }

};

//DELETE POST
PostsController.delete = async (req, res) => {

    let id = req.body.id;

    try {
        await Post.findByIdAndDelete(id)
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error deleting post", error);
        res.send("Error deleting post", error);
    }
};

//UPDATE POST
PostsController.update = async (req, res) => {

    let id = req.body.id
    let title = req.body.title;
    let img = req.body.img;
    let text = req.body.text;
    let rating = req.body.rating;
    let keywords = req.body.keywords;
    let comments = req.body.comments;

    try {
        await Post.findByIdAndUpdate(id, {
            $set: {
                title: req.body.title,
                img: req.body.img,
                text: req.body.text,
                rating: req.body.rating,
                keywords: req.body.keywords,
                comments: req.body.comments,
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating post", error);
        res.send("Error updating post", error);
    }
};

//UPDATE POST TITLE
PostsController.updateTitle = async (req, res) => {

    let id = req.body.id
    let title = req.body.title;

    try {
        await Post.findByIdAndUpdate(id, {
            $set: {
                title: title
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating post title", error);
        res.send("Error updating post title", error);
    }
};

//UPDATE POST IMG
PostsController.updateImg = async (req, res) => {

    let id = req.body.id
    let img = req.body.img;

    try {
        await Post.findByIdAndUpdate(id, {
            $set: {
                img: img
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating post img", error);
        res.send("Error updating post img", error);
    }
};

//UPDATE POST TEXT
PostsController.updateText = async (req, res) => {

    let id = req.body.id
    let text = req.body.text;

    try {
        await Post.findByIdAndUpdate(id, {
            $set: {
                text: text
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating post text", error);
        res.send("Error updating post text", error);
    }
};

//RATE POST
PostsController.rate = async (req, res) => {

    let id = req.body.id;
    let userId = req.body.userId;
    let userNickname = req.body.userNickname;
    let rate = req.body.rate;

    try {
        await Post.findByIdAndUpdate(id, {
            $push: {
                rating: {
                    userId: userId,
                    userNickname: userNickname,
                    rate: rate
                }
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error rating post", error);
        res.send("Error rating post", error);
    }
};

//GET RATE POST
PostsController.getRate = async (req, res) => {

    let id = req.params.id;

    try {
        await Post.find({
            _id: id
        })
            //Summatory of rate value of the rating array
            .then(elmnt => {
                let sum = elmnt[0].rating.reduce((a, b) => {
                    return {
                        rate: a.rate + b.rate
                    }
                });

                //Get average
                sum = sum.rate / elmnt[0].rating.length;

                //Round to 1 decimal
                sum = sum.toFixed(1)

                res.send(sum);

            })

    } catch (error) {
        res.send("backend get rate error: ", error)
    }

};















//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = PostsController;