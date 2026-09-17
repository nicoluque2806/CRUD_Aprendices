require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const sistemaArchivo = require('fs');
const ruta = require('path');

// Importar middlewares desde ./src/middleware/ (ajusta la ruta según tu estructura)
const registroMiddleware = require('./src/middleware/registroMiddleware');
const manejadorErrores = require('./src/middleware/manejadorErrores');
const autenticarToken = require('./src/middleware/autenticarToken');

// Importar validaciones
const validarAprendiz = require('./validaciones/validar');

const app = express();
const port = process.env.PORT || 3000;
const rutaArchivoJson = ruta.join(__dirname, 'listaDatos.json');

// --- Middlewares globales ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registroMiddleware);

// Configuración de Multer
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: almacenamiento });

// --- Rutas públicas y de autenticación ---
app.get('/', (req, res) => {
    res.send('API RESTFUL - CRUD Aprendices');
});

// Endpoint inicio de sesión para generar Token JWT
app.post('/login', (req, res) => {
    const { usuario, clave } = req.body;

    const usuariobd = {
        usuario: 'Paula',
        clave: '123456'
    };

    if (usuario !== usuariobd.usuario || clave !== usuariobd.clave) {
        return res.status(401).json({ mensaje: 'Usuario y/o clave incorrectos.' });
    }

    const token = jwt.sign(
        { user: usuario },
        process.env.JWT_SECRET || 'secreto_super_seguro',
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// --- Rutas del CRUD de Aprendices ---
app.get('/api/aprendices', (req, res) => {
    sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: 'Error al leer el archivo' });
        }
        try {
            const listaAprendices = JSON.parse(datos);
            res.json(listaAprendices);
        } catch (error) {
            res.status(500).json({ Error: 'Error al procesar el archivo JSON' });
        }
    });
});

app.get('/api/aprendices/:dni', (req, res) => {
    const dni = parseInt(req.params.dni);
    sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: 'Error al leer el archivo' });
        }
        try {
            const listaAprendices = JSON.parse(datos);
            const aprendiz = listaAprendices.find(a => a.dni === dni);

            if (!aprendiz) {
                return res.status(404).json({ Error: 'Aprendiz no encontrado' });
            }
            res.json(aprendiz);
        } catch (error) {
            res.status(500).json({ Error: 'Error al procesar el archivo JSON' });
        }
    });
});

app.post('/api/aprendices', (req, res) => {
    const datoAprendiz = req.body;
    const errorValidacion = validarAprendiz(datoAprendiz);

    if (errorValidacion) {
        return res.status(400).json({ Error: errorValidacion });
    }

    sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: 'Error al leer el archivo' });
        }
        try {
            const listaAprendices = JSON.parse(datos);
            let nuevoDni = 1;

            if (listaAprendices.length > 0) {
                nuevoDni = Math.max(...listaAprendices.map(a => a.dni || 0)) + 1;
            }

            const nuevoAprendiz = { dni: nuevoDni, ...datoAprendiz };
            listaAprendices.push(nuevoAprendiz);

            sistemaArchivo.writeFile(
                rutaArchivoJson,
                JSON.stringify(listaAprendices, null, 2),
                error => {
                    if (error) {
                        return res.status(500).json({ Error: 'No se puede registrar el aprendiz' });
                    }
                    res.status(201).json(nuevoAprendiz);
                }
            );
        } catch (error) {
            res.status(500).json({ Error: 'Error al procesar el archivo JSON' });
        }
    });
});

app.put('/api/aprendices/:dni', (req, res) => {
    const dni = parseInt(req.params.dni);
    const datosAprendiz = req.body;

    const errorValidacion = validarAprendiz(datosAprendiz);
    if (errorValidacion) {
        return res.status(400).json({ Error: errorValidacion });
    }

    sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: 'Error al leer el archivo' });
        }
        try {
            let listaAprendices = JSON.parse(datos);
            const existeAprendiz = listaAprendices.some(a => a.dni === dni);

            if (!existeAprendiz) {
                return res.status(404).json({ Error: 'Aprendiz no encontrado' });
            }

            listaAprendices = listaAprendices.map(a =>
                a.dni === dni ? { ...a, ...datosAprendiz, dni: dni } : a
            );

            sistemaArchivo.writeFile(
                rutaArchivoJson,
                JSON.stringify(listaAprendices, null, 2),
                error => {
                    if (error) {
                        return res.status(500).json({ Error: 'No se puede actualizar el aprendiz' });
                    }
                    const aprendizActualizado = listaAprendices.find(a => a.dni === dni);
                    res.json(aprendizActualizado);
                }
            );
        } catch (error) {
            res.status(500).json({ Error: 'Error al procesar el archivo JSON' });
        }
    });
});

app.delete('/api/aprendices/:dni', (req, res) => {
    const dni = parseInt(req.params.dni);
    sistemaArchivo.readFile(rutaArchivoJson, 'utf-8', (error, datos) => {
        if (error) {
            return res.status(500).json({ Error: 'Error al leer el archivo' });
        }
        try {
            let listaAprendices = JSON.parse(datos);
            const existeAprendiz = listaAprendices.some(a => a.dni === dni);

            if (!existeAprendiz) {
                return res.status(404).json({ Error: 'Aprendiz no encontrado' });
            }

            listaAprendices = listaAprendices.filter(a => a.dni !== dni);

            sistemaArchivo.writeFile(
                rutaArchivoJson,
                JSON.stringify(listaAprendices, null, 2),
                error => {
                    if (error) {
                        return res.status(500).json({ Error: 'No se puede eliminar el aprendiz' });
                    }
                    res.json({ mensaje: 'Aprendiz eliminado correctamente' });
                }
            );
        } catch (error) {
            res.status(500).json({ Error: 'Error al procesar el archivo JSON' });
        }
    });
});

// --- Rutas de prueba y protegidas ---
app.get('/error', (req, res, next) => {
    next(new Error('Error provocado'));
});

app.get('/rutaProtegida', autenticarToken, (req, res) => {
    res.json({ mensaje: 'Esta es una ruta protegida' });
});

// --- Manejo global de errores (Siempre al final) ---
app.use(manejadorErrores);

app.listen(port, () => {
    console.log(`SERVER: http://localhost:${port}`);
});

app.post('/api/autenticar/login', (req, res) => {
    const { usuario, clave } = req.body;

    const usuariobd = {
        usuario: 'Paula',
        clave: '123456'
    };

    if (usuario !== usuariobd.usuario || clave !== usuariobd.clave) {
        return res.status(401).json({ mensaje: 'Usuario y/o clave incorrectos.' });
    }

    const token = jwt.sign(
        { user: usuario },
        process.env.JWT_SECRET || 'secreto_super_seguro',
        { expiresIn: '1h' }
    );

    res.json({ token });
});