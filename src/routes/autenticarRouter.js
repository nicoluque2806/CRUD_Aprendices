const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
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

module.exports = router;