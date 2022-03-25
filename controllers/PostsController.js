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
const mongoose = require("mongoose");



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
PostsController.addRate = async (req, res) => {

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
    console.log("entro");
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


//UPDATE POST KEYWORDS
PostsController.updateKeywords = async (req, res) => {

    let id = req.body.id
    let keywords = req.body.keywords;

    try {
        await Post.findByIdAndUpdate(id, {
            $set: {
                keywords: keywords
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating post keywords", error);
        res.send("Error updating post keywords", error);
    }
};


//ADD POST COMMENT
PostsController.addComment = async (req, res) => {
    let commentId = mongoose.Types.ObjectId();
    let postId = req.body.postId;
    let ownerId = req.body.ownerId;
    let ownerNickname = req.body.ownerNickname;
    let comment = req.body.comment;
    let created = moment().format('DD/MM/YYYY, HH:mm:ss');
    let answers = [];
    let rating = [];

    try {
        await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    commentId: commentId,
                    ownerId: ownerId,
                    ownerNickname: ownerNickname,
                    comment: comment,
                    created: created,
                    answers: answers,
                    rating: rating
                }
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error adding comment to post", error);
        res.send("Error adding comment to post", error);
    }
};


//DELETE POST COMMENT
PostsController.deleteComment = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let commentsArr = [];

    try {
        //Find owner user
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment to delete
            for(let i=0 ; i<commentsArr.length ; i++){
                if(commentsArr[i].commentId == commentId){
                    //remove it of followed array
                    commentsArr.splice(i, 1)
                }
            }

            Post.findByIdAndUpdate(postId, {
                $set: {
                    comments: commentsArr
                }
            }).setOptions({ returnDocument: 'after' })
                .then(elmnt => {
                    res.send(elmnt)
                })

        })





    } catch (error) {
        res.send("backend edit user error: ", error);
    }
};










//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = PostsController;