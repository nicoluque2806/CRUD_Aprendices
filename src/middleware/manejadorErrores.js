const manejadorErrores = (error, req, res, next) => {
    // Capturar el código de estado (soporta statusCode o status) o asigna 500 por defecto
    const codigoEstado = error.statusCode || error.status || 500;
    const mensaje = error.message || "Error inesperado";

    // Registrar el error en la consola del servidor
    console.error(`Hubo un error: ${new Date().toISOString()} - ${codigoEstado} - ${mensaje}`);
    
    if (error.stack) {
        console.error(error.stack);
    }

    // Enviar la respuesta HTTP con el código de estado correspondiente
    res.status(codigoEstado).json({
        Estado: "ERROR",
        codigoEstado,
        mensaje,
        // Incluir el stack trace únicamente en entorno de desarrollo
        ...(process.env.NODE_ENV === "development" && { stack: error.stack })
    });
};

module.exports = manejadorErrores;