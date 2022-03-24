const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: false
    },
    rating: {
        type: Array,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    followed: {
        type: Array,
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


userSchema.set('toJSON', toJSONConfig);

const User = mongoose.model("User", userSchema);
module.exports = User;



