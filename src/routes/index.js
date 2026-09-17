const {Router} = require("express")

const pruebaRouter = require("./pruebaRouter")
const autenticarRouter = require("./autenticarRouter")
const enrutador = Router()

enrutador.use("/rutaPrueba", pruebaRouter)
enrutador.use("/autenticar", autenticarRouter)

module.exports = enrutador