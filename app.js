import express from 'express';
import "dotenv/config";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generar una ruta para el archivo listaDatos.json
const rutaArchivoJson = path.join(__dirname, 'listaDatos.json');

// Ruta raíz
app.get('/', (req, res) => {
    res.send('API RESTFUL - CRUD Aprendices');
});

// Endpoint para obtener todos los aprendices
app.get('/api/aprendices', (req, res) => {

    fs.readFile(rutaArchivoJson, 'utf-8', (error, datos) => {

        if (error) {
            return res.status(500).json({
                Error: "Error al leer el archivo"
            });
        }

        try {
            const listaAprendices = JSON.parse(datos);
            res.json(listaAprendices);

        } catch (error) {
            res.status(500).json({
                Error: "Error al procesar el archivo JSON"
            });
        }
    });
});

// Modo de escucha del servidor
app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`);
});