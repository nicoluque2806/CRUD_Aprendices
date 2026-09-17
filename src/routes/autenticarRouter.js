const {Router} = require('express')

const enrutador = Router()
// esta funcion la vamos a pasar al controlador
// importamos del controlador
const iniciarSesion = require("../controllers/autenticarController.js")
enrutador.get("/", (req,res) => {
    res.json({mensaje: "ruta de autenticacion"})
})

enrutador.post("/login", iniciarSesion)

enrutador.post("/registro", (req,res)=> {
    res.json({mensaje: "ruta de registro"})
})
module.exports = enrutador