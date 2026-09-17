const jsonwebtoken = require('jsonwebtoken');

const autenticarToken = (req, res, next) => {
    // Extraer o capturar el token del encabezado "autenticacion"
    const token = req.header("autenticacion")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Acceso denegado, no existe el token" });
    }

    // Verificación del token
    jsonwebtoken.verify(token, process.env.JWT_SECRET, (error, usuario) => {
        if (error) {
            return res.status(403).json({ Error: "Token Inválido" });
        }

        req.usuario = usuario;
        console.log("De autenticación:", req.usuario);
        next();
    });
};

module.exports = autenticarToken;