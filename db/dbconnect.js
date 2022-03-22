const dbconnect = () => {

    //Importo mongoose
    const mongoose = require("mongoose");

    //URI
    const conn_str = "mongodb+srv://SocialMeme:socialmemefsd@cluster0.ofpax.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    mongoose.connect(
        conn_str,
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        },(err) => {
            if (err) {
                console.log("error in connection",err);
            } else {
                console.log("mongodb is connected");
        }});


}

module.exports = dbconnect;