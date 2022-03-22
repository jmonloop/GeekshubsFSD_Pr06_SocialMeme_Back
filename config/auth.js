//Importo el fichero .env para traerme las variables de entorno
require('dotenv').config();  // this line is important!
//Exporto las variables secret, expires y rounds necesarias para encriptar cosas como el token de usuario o datos como el password al ser guardados o sacados de la BBDD
module.exports = {
    //Si se bajan el repo, como no tendrán variables de entorno, que puedan trabajar con las constantes
    secret: process.env.AUTH_SECRET || "zA23RtfLoPP", //secuencia de encriptación

    expires: process.env.AUTH_EXPIRES || "24h",//caducidad del token

    rounds: process.env.AUTH_ROUNDS || 10 //ciclos de encriptado

}

//El OR es para poder hacer pruebas en caso de no tener las .env ya que no se suben al repositorio