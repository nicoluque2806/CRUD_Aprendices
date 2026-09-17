const {Router} = require("express")

const enrutador = Router()

const iniciarSesion = require ("../controllers/autenticarController")

enrutador.get("/login", iniciarSesion)

enrutador.post("/registro", (res, req) => {
    res.json({mensaje:"ruta registro"})
})

module.exports = enrutador