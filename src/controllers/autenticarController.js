const jswtoken = require("jsonwebtoken")

const iniciarSesion = async (req, res) => {
    const { usuario, clave } = req.body
    const usuariobd = {
        "usuario": "jhonny",
        "clave": "abc123"   
    }

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