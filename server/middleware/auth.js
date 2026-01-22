const jwt = require('jsonwebtoken')

module.exports.verifyToken = (req, res, next) => {
    //Validamos que el request tenga en el header el atributo authorization
    if (!req.headers.authorization) {
        res.status(401).send({ success: false, error: "Usuario sin autentificación" });
    } else {
        //Verificamos la autenticidad del token con la clave secreta y decodificamos la información
        jwt.verify(req.headers.authorization, "secret!", function (err, decoded) {
            //Validamos que se haya decodificado
            if(decoded){
                //Asiganmos los datos a una nueva variable en el request
                req.user = decoded.data

                //Continuamos con la petición
                next()
            }else{
                res.status(401).send({ success: false, error: "Usuario sin autorización" });
            }
        })
    }
}

module.exports.verifyTokenAdmin = (req, res, next) => {
    //Validamos que el request tenga en el header el atributo authorization
    if (!req.headers.authorization) {
        res.status(401).send({ success: false, error: "Usuario sin autentificación" });
    } else {
        //Verificamos la autenticidad del token con la clave secreta y decodificamos la información
        jwt.verify(req.headers.authorization, "secret!", function (err, decoded) {
            //Validamos que se haya decodificado
            if(decoded){
                //Validamos que el tipo de usuario sea de ADMIN
                if(decoded.data.tipo == 1){
                    //Asiganmos los datos a una nueva variable en el request
                    req.user = decoded.data         
                    
                    //Continuamos con la petición       
                    next();
                }else{
                    res.status(401).send({ success: false, error: "Usuario sin autorización" });
                }
            }else{
                res.status(401).send({ success: false, error: "Usuario sin autorización" });
            }
        })
    }
}