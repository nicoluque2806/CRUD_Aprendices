const jswtoken = require("jsonwebtoken")
const ingresar = require("../services/autenticarService")
const iniciarSesion = async (req, res) => {
    const { usuario, clave } = req.body
    if (usuario !== usuariobd.usuario || clave !== usuariobd.clave) {
        return res.json({ mensaje: "Usuario y/o clave incorrectos." })
    }
    const token = jswtoken.sign(
        { usuario: usuario }, 
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } 
    )

    res.json({ token }) 
}

module.exports = iniciarSesion