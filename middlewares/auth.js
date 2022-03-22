//Importo la clase jsonwebtoken
const jwt = require('jsonwebtoken');
//Importo el fichero de configuración ../config/auth para darle los parámetros de encriptado al token
const authConfig = require('../config/auth');

//Exporto la función middleware.
//Además de req y res, tiene el argumento 'next' para saber cuándo la función ha terminado exitosamente y el endpoint que estemos limitando con 'auth' puede continuar para ejecutar lo que tiene después (su función controladora)
module.exports = (req, res, next) => {
    // Comprueba si el header (metadatos de la página o si lo hacemos por Postman, está en el authorization) tiene el token
    if(!req.headers.authorization) {
        //Si no lo tiene, no dejará ejecutar la función controladora del endpoint (ver en usuarioRouter) y envía un mensaje de que no hay acceso
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {
        // Si lo tiene, Lo extrae
        let token = req.headers.authorization.split(" ")[1];
        // Y comprueba su validez usando la clave de encriptación que tenemos en ../config/auth
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            //Si la validación es incorrecta...
            if(err) {
                //...devuelve un error
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
                //Si la validación es correcta...
            } else {
                req.user = decoded;
                //Activa el next() del middleware que actúa como un return, haciendo el que continúe en el endpoint donde lo metimos, y ejecutando así su función controladora
                next();
            }
        })
    }
};