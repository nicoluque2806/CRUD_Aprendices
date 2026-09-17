const registroMiddleware = (req, res, next) => {
    const fecha = new Date().toISOString();
    const tiempoMilisegundos = Date.now();

    console.log(`[Historial Peticiones]: ${fecha} - ${req.method} ${req.url} - IP: ${req.ip}`);

    // Escuchar cuando la respuesta haya sido enviada
    res.on('finish', () => {
        const duracion = Date.now() - tiempoMilisegundos;
        console.log(`[Respuesta]: ${fecha} - Estado: ${res.statusCode} - Duración: ${duracion}ms`);
    });

    next();
};

module.exports = registroMiddleware;