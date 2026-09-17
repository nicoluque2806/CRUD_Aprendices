const {Router} = require('express')

const enrutador = Router()
// esta funcion la vamos a pasar al controlador
enrutador.get("/", (req,res) => {
    res.json({mensaje: "ruta de autenticacion"})
})

module.exports = enrutador