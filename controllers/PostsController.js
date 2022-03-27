//Importo el modelo Usuario para poder escribir en la tabla Usuario de la BBDD
const Post = require('../models/post.js');

const User = require('../models/user.js');
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
    let ratingAverage = 0;
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
            ratingAverage: ratingAverage,
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

    let postId = req.body.postId;


    try {
        await Post.find({
            _id: postId
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

    let postId = req.body.postId;

    try {
        await Post.findByIdAndDelete(postId)
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

    let postId = req.body.postId
    let title = req.body.title;
    let img = req.body.img;
    let text = req.body.text;
    let rating = req.body.rating;
    let keywords = req.body.keywords;
    let comments = req.body.comments;

    try {
        await Post.findByIdAndUpdate(id, {
            $set: {
                title: title,
                img: img,
                text: text,
                rating: rating,
                keywords: keywords,
                comments: comments,
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

    let postId = req.body.postId
    let title = req.body.title;

    try {
        await Post.findByIdAndUpdate(postId, {
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

    let postId = req.body.postId
    let img = req.body.img;

    try {
        await Post.findByIdAndUpdate(postId, {
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

    let postId = req.body.postId
    let text = req.body.text;

    try {
        await Post.findByIdAndUpdate(postId, {
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
PostsController.addRating = async (req, res) => {

    let postId = req.body.postId;
    let raterId = req.body.raterId;
    let raterNickname = req.body.raterNickname;
    let rate = req.body.rate;
    let sum;

    try {
        await Post.findByIdAndUpdate(postId, {
            $push: {
                rating: {
                    raterId: raterId,
                    raterNickname: raterNickname,
                    rate: rate
                }
            }
        })
    } catch (error) {
        console.log("Error rating post", error);
        res.send("Error rating post", error);
    }

    try {
        await Post.find({
            _id: postId
        })
            //Summatory of rate value of the rating array
            .then(elmnt => {
                if (elmnt[0].rating.length > 1) {
                    sum = elmnt[0].rating.reduce((a, b) => {
                        return {
                            rate: a.rate + b.rate
                        }
                    });

                    //Get average
                    sum = sum.rate / elmnt[0].rating.length;

                    //Round to 1 decimal
                    sum = sum.toFixed(1)

                }
            })
    } catch (error) {
        console.log("Error sum rating post", error);
        res.send("Error sum rating post", error);
    }


    try {
        await Post.findByIdAndUpdate(postId, {
            ratingAverage: sum

        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating post rating average", error);
        res.send("Error updating post rating average", error);
    }



};


//GET RATE POST
PostsController.getRating = async (req, res) => {
    let postId = req.body.postId;

    try {
        await Post.find({
            _id: postId
        })
            //Summatory of rate value of the rating array
            .then(elmnt => {

                console.log(elmnt[0].ratingAverage);
                res.send({
                    ratingAverage: elmnt[0].ratingAverage
                });

            })

    } catch (error) {
        res.send("backend get post rating error: ", error)
    }

};


//UPDATE POST KEYWORDS
PostsController.updateKeywords = async (req, res) => {

    let postId = req.body.postId
    let keywords = req.body.keywords;

    try {
        await Post.findByIdAndUpdate(postId, {
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
    let ratingAverage = 0;

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
                    rating: rating,
                    ratingAverage: ratingAverage
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

//GET ALL POST COMMENTS
PostsController.getAllComments = async (req, res) => {
    let postId = req.body.postId;

    try {
        //Find owner user
        Post.find({
            _id: postId
        }).then(elmnt => {
            res.send(elmnt[0].comments)
        })

    } catch (error) {
        res.send("backend get all post comments error: ", error);
    }
};

//GET COMMENT
PostsController.getComment = async (req, res) => {
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
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    res.send(commentsArr[i])
                }
            }

        })

    } catch (error) {
        res.send("backend get comment error: ", error);
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
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
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
        res.send("backend delete comment error: ", error);
    }
};

//UPDATE POST COMMENT
PostsController.updateComment = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let comment = req.body.comment;
    let updated = moment().format('DD/MM/YYYY, HH:mm:ss');
    let commentsArr = [];

    try {
        //Find owner user
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment to delete
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //update it with body data
                    commentsArr[i].comment = comment;
                    commentsArr[i].updated = updated;
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
        res.send("backend update comment error: ", error);
    }
};


//ADD COMMENT RATING
PostsController.addCommentRating = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let raterId = req.body.raterId;
    let raterNickname = req.body.raterNickname;
    let updated = moment().format('DD/MM/YYYY, HH:mm:ss');
    let rate = req.body.rate;
    let ratingAverage;
    let sum;

    try {
        //Find owner user
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment to rate
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //update it with body data
                    commentsArr[i].rating.push({
                        raterId: raterId,
                        raterNickname: raterNickname,
                        rate: rate
                    })
                    commentsArr[i].updated = updated;

                    if (commentsArr.length !== 0) {
                        sum = commentsArr[i].rating.reduce((a, b) => {
                            return {
                                rate: a.rate + b.rate
                            }
                        });

                        //Get average
                        sum = sum.rate / elmnt[0].rating.length;

                        //Round to 1 decimal
                        sum = sum.toFixed(1)

                        commentsArr[i].ratingAverage = sum;
                    }
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
        res.send("backend update comment error: ", error);
    }
};


//GET COMMENT RATING
PostsController.getCommentRating = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let commentsArr = [];

    try {
        await Post.find({
            _id: postId
        })
            //Summatory of rating value of the rating array
            .then(elmnt => {
                commentsArr = elmnt[0].comments;
                //Find desired comment
                for (let i = 0; i < commentsArr.length; i++) {
                    if (commentsArr[i].commentId == commentId) {

                        res.send({
                            ratingAverage: commentsArr[i].ratingAverage
                        });

                    }
                }

            })

    } catch (error) {
        res.send("backend get comment rating error: ", error)
    }
};


//ADD COMMENT ANSWER
PostsController.addCommentAnswer = async (req, res) => {
    let answerId = mongoose.Types.ObjectId();
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let ownerId = req.body.ownerId;
    let ownerNickname = req.body.ownerNickname;
    let answer = req.body.answer;
    let created = moment().format('DD/MM/YYYY, HH:mm:ss');
    let commentsArr = [];

    try {
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment to add answer
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //Add new answer
                    commentsArr[i].answers.push({
                        answerId: answerId,
                        ownerId: ownerId,
                        ownerNickname: ownerNickname,
                        answer: answer,
                        created: created
                    })
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
        res.send("backend add answer to comment error: ", error);
    }
};


//DELETE COMMENT ANSWER
PostsController.deleteCommentAnswer = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let answerId = req.body.answerId;
    let commentsArr = [];
    let answersArr = [];

    try {
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment with the answer
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //Save actual answers array in the variable
                    answersArr = commentsArr[i].answers;
                    //Find desired answer to delete
                    for (let j = 0; j < answersArr.length; j++) {
                        if (answersArr[j].answerId == answerId) {
                            answersArr.splice(j, 1)
                        }
                    }

                    //Save updated answersArr into comments
                    commentsArr[i].answers = answersArr;
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
        res.send("backend delete comment answer error: ", error);
    }
};


//UPDATE COMMENT ANSWER
PostsController.updateCommentAnswer = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let answerId = req.body.answerId;
    let answer = req.body.answer;
    let updated = moment().format('DD/MM/YYYY, HH:mm:ss');
    let commentsArr = [];
    let answersArr = [];

    try {
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment with the answer
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //Save actual answers array in the variable
                    answersArr = commentsArr[i].answers;
                    //Find desired answer to delete
                    for (let j = 0; j < answersArr.length; j++) {
                        if (answersArr[j].answerId == answerId) {
                            answersArr[j].answer = answer;
                            answersArr[j].updated = updated;
                        }
                    }

                    //Save updated answersArr into comments
                    commentsArr[i].answers = answersArr;
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
        res.send("backend delete comment answer error: ", error);
    }
};


//GET COMMENT ANSWER
PostsController.getCommentAnswer = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let answerId = req.body.answerId;
    let commentsArr = [];
    let answersArr = [];

    try {
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment with the answer
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //Save actual answers array in the variable
                    answersArr = commentsArr[i].answers;
                    //Find desired answer
                    for (let j = 0; j < answersArr.length; j++) {
                        if (answersArr[j].answerId == answerId) {
                            res.send(answersArr[j])
                        }
                    }
                }
            }
        })

    } catch (error) {
        res.send("backend get comment answer error: ", error);
    }
};


//GET ALL COMMENT ANSWERS
PostsController.getAllCommentAnswers = async (req, res) => {
    let postId = req.body.postId;
    let commentId = req.body.commentId;
    let commentsArr = [];

    try {
        Post.find({
            _id: postId
        }).then(elmnt => {
            //Save actual comments array in the variable
            commentsArr = elmnt[0].comments;

            //Find desired comment with the answers
            for (let i = 0; i < commentsArr.length; i++) {
                if (commentsArr[i].commentId == commentId) {
                    //Save actual answers array in the variable
                    res.send(commentsArr[i].answers);
                }
            }
        })

    } catch (error) {
        res.send("backend get all comment answers error: ", error);
    }
};


//GET POSTS BY USER
PostsController.getPostsByUser = async (req, res) => {
    let ownerId = req.body.ownerId;

    try {
        Post.find({
            ownerId: ownerId
        }).then(elmnt => {
            console.log(elmnt)
            res.send(elmnt)
        })

    } catch (error) {
        res.send("backend get posts by user error: ", error);
    }
};


//FIND POSTS BY KEYWORDS
PostsController.find = async (req, res) => {
    let term = req.body.term
    let results = {};

    //If search term is not a number...

    if (term && term !== "") {
        await Post.find({
            //Search in Posts string fields using regex
            $or: [
                { ownerNickname: { $regex: new RegExp(term), $options: "i" } },
                { title: { $regex: new RegExp(term), $options: "i" } },
                { text: { $regex: new RegExp(term), $options: "i" } },
                { keywords: { $regex: new RegExp(term), $options: "i" } },
                { "comments.comment": { $regex: new RegExp(term), $options: "i" } },
                { "comments.answers.answer": { $regex: new RegExp(term), $options: "i" } },
            ]
        }).then(stringElmnt => {
            if (stringElmnt.length !== 0) {
                results = {
                    postsResults: stringElmnt
                }
            } else {
                results = {
                    postsResults: []
                }
            }
        })


        await User.find({

            $or: [
                { nickname: { $regex: new RegExp(term), $options: "i" } },

            ]
        }).then(stringElmnt => {
            if (stringElmnt.length !== 0) {
                results.usersResults = stringElmnt;
            } else {
                results.usersResults = [];
            }
        })

        res.send(results);
    } else {
        res.send("Term field can not be empty")
    }


};






//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = PostsController;