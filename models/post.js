const mongoose = require("mongoose");
const moment = require('moment');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    ownerId: {
        type: String,
        required: true
    },
    ownerNickname: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    rating: {
        type: Array,
    },
    keywords: {
        type: Array,
        required: true
    },
    comments: {
        type: Array
    },
    created: {
        type: String,
        default: moment().format('DD/MM/YYYY, HH:mm:ss')
    },
    updated: {
        type: String
    }
});
//Creo un index con los campos en los que querré buscar por cadena de texto.
//name: 'textScore' se usa para devolver una puntuación en base a la relevancia de la búsqueda
// userSchema.index({ name: 'text', surname: 'text', age: 'text', email: 'text', nickname:'text', rol: 'text'}, { name: 'textScore'});

const toJSONConfig = {
    transform: (doc,ret,opt) => {//transform es un metodo de mongoose
           delete ret['password']//ret es un metodo encripta la password para enviarla con mas seguridad
           return ret
    }
}


postSchema.set('toJSON', toJSONConfig);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;