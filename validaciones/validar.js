function validarAprendiz(datos) {


    if (datos.nombre === undefined || datos.nombre === '') {
        return 'El nombre es obligatorio';
    }
    if (typeof datos.nombre !== 'string') {
        return 'El nombre debe ser texto';
    }
    const nombre = datos.nombre.trim();
    if (nombre.length < 3) {
        return 'El nombre debe tener mínimo 3 caracteres';
    }
    if (nombre.length > 30) {
        return 'El nombre no puede tener más de 30 caracteres';
    }


    if (datos.correo === undefined || datos.correo === '') {
        return 'El correo es obligatorio';
    }
    if (typeof datos.correo !== 'string') {
        return 'El correo debe ser texto';
    }
    if (!datos.correo.includes('@')) {
        return 'El correo debe contener @';
    }
    if (datos.correo.length > 100) {
        return 'El correo no puede tener más de 100 caracteres';
    }
    return null;
}


// Exportar la función
module.exports = validarAprendiz;