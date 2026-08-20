const express = require('express');
const app = express();
const port = 3000;

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Modo de escucha del servidor
app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`);
});
