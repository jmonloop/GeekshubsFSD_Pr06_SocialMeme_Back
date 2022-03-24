const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
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
    avatar: {
        type: String,
        required: false
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