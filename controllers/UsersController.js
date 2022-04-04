//Importo el modelo Usuario para poder escribir en la tabla Usuario de la BBDD
const User = require('../models/user.js');
//Importo la clase bcrypt para poder encriptar
const bcrypt = require('bcrypt');
//Importo el fichero ../config/auth.js para poder darle los parámetros al encriptado
const authConfig = require('../config/auth');
//Importo la clase jsonwebtoken para generar un token al hacer login
const jwt = require('jsonwebtoken');
//Declaro el objeto UsuariosController (siempre igual para cada controller)
const UsersController = {};


//USER REGISTER
UsersController.register = async (req, res) => {


    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let nickname = req.body.nickname;
    let rating = req.body.rating;
    let avatar = req.body.avatar;


    await User.find({
        $or: [
            { email: email },
            { nickname: nickname }
        ]
    }).then(resultado => {
        if (resultado.length == 0) {
            User.create({
                email: email,
                password: password,
                nickname: nickname,
                rating: rating,
                avatar: avatar
            }).then(elmnt => {
                res.send(`${elmnt.nickname} you have been registered succesfully`)
            })
        } else {
            res.send(`This user already exists in the database`)
        }
    })
};

//USER LOGIN
UsersController.login = async (req, res) => {
    let nickname = req.body.nickname;
    let password = req.body.password;

    await User.find({
        nickname: nickname
    }).then(elmnt => {
        console.log("hola",elmnt);
        if (elmnt.length === 0) {
            res.send("Invalid nickname or password");
        } else {
            if (bcrypt.compareSync(password, elmnt[0].password)) {
                let token = jwt.sign({ usuario: elmnt }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                let loginOkMessage = `welcome again ${elmnt[0].nickname}`
                res.json({
                    loginOkMessage,
                    user: elmnt[0],
                    token: token
                })
            } else {
                res.status(401).json({ msg: "Invalid nickname or password" });
            }
        };
    })
};

//GET USER
UsersController.get = async (req, res) => {

    try {
        await User.find({
            _id: req.query.id
        })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        res.send("backend getUser error: ", error)
    }



}

//DELETE USER
UsersController.delete = async (req, res) => {
    let id = req.body.id;

    try {
        await User.findByIdAndDelete(id)
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error deleting user", error);
        res.send("Error deleting user", error);
    }
};

//UPDATE USER EMAIL
UsersController.updateEmail = async (req, res) => {
    let id = req.body.id;
    let email = req.body.email;
    try {
        await User.findByIdAndUpdate(id, {
            $set: {
                email: email,
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt)
            })
    } catch (error) {
        console.log("Error updating user email", error);
        res.send("Error updating user email", error);
    }
}

//UPDATE USER AVATAR
UsersController.updateAvatar = async (req, res) => {
    let id = req.body.id;
    let avatar = req.body.avatar;
    try {
        await User.findByIdAndUpdate(id, {
            $set: {
                avatar: avatar,
            }
        }).setOptions({ returnDocument: 'after' })
            .then(elmnt => {
                res.send(elmnt[0])
            })
    } catch (error) {
        console.log("Error updating user avatar", error);
        res.send("Error updating user avatar", error);
    }
}



//Get user rating
UsersController.getRating = async (req, res) => {

    await User.find({
        _id: req.query.id
    })
        //Summatory of rating array
        .then(elmnt => {
            if (elmnt[0].rating.length !== 0) {
                let sum = elmnt[0].rating.reduce((a, b) => a + b);
                //Get average
                sum = sum / elmnt[0].rating.length;
                //Round to 1 decimal
                sum = sum.toFixed(1)

                //Return an object cause raw number is detected as error code
                let result = {
                    rate: sum
                }

                res.send(result);
            } else {
                res.send("0")
            }

        })

}

//Follow user
UsersController.follow = async (req, res) => {

    let followedId = req.body.followedId;
    let followedNickname = req.body.followedNickname;
    let userId = req.body.userId;
    //Create empty array for manage the followed field
    let followed = [];
    try {
        //1 Find owner user
        User.find({
            _id: userId
        }).then(elmnt => {
            //Save actual followed array in the variable
            followed = elmnt[0].followed;
            //Add the new followed object to the variable
            followed.push({
                followedId: followedId,
                followedNickname: followedNickname
            });

            User.findByIdAndUpdate(userId, {
                $set: {
                    followed: followed
                }
            }).setOptions({ returnDocument: 'after' })
                .then(elmnt => {
                    res.send(elmnt)
                })
        })

    } catch (error) {
        res.send("backend follow user error: ", error);
    }





}

//Unfollow
UsersController.unfollow = async (req, res) => {

    let unfollowedId = req.body.unfollowedId;
    let userId = req.body.userId;
    //Create empty array for manage the followed field
    let followed = [];
    try {
        //Find owner user
        User.find({
            _id: userId
        }).then(elmnt => {
            //Save actual followed array the variable
            followed = elmnt[0].followed;

            //Find desired user id to unfollow
            for (let i = 0; i < followed.length; i++) {
                if (followed[i].followedId == unfollowedId) {
                    //remove it of followed array
                    followed.splice(i, 1)
                }
            }

            User.findByIdAndUpdate(userId, {
                $set: {
                    followed: followed
                }
            }).setOptions({ returnDocument: 'after' })
                .then(elmnt => {
                    res.send(elmnt)
                })


        })





    } catch (error) {
        res.send("backend unfollow user error: ", error);
    }
}





























//Exporto UsuariosController para que pueda ser importado desde otros ficheros una vez ha ejecutado la lógica de éste(siempre igual)
module.exports = UsersController;