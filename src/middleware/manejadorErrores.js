const manejadorErrores = (error, req, res, next) => {
    const codigoEstado = error.statusCode || 500
    const mensaje = error.message || "Error inesperado"
    console.error(`Hubo un error: ${new Date().toISOString()} - 
    ${codigoEstado} - ${mensaje}`)
    if(error.stack){
        console.log(error.stack)
    }
    res.json({
        Estado: "Error",
        codigoEstado,
        mensaje,
        ...(process.env.NODE_ENV === "development" && {stack: error.stack})
    })
}

module.exports = manejadorErrores