const autenticarRouter = require('./routes/autenticar'); // o la ruta a tu enrutador

// Asignar el prefijo /api/autenticar
app.use('/api/autenticar', autenticarRouter);
require('dotenv').config()
const express = require('express')
//importar enrutador
const enrutador = require('./routes')
const app = express()

//middleware formatear datos del body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//ruta por defecto para toda la app
app.use("/api", enrutador)

app.get("/", (req, res) => {
    res.send("API REST")
})

module.exports = app
