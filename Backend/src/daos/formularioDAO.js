const pool = require('../config/db');

async function crearFormulario(nombre, descripcion, pregunta, fechaCreacion, estado, fechaCierre = null, usuario) {
    const query = `
        INSERT INTO formularios (nombre, descripcion, pregunta, fecha_creacion, estado, fecha_cierre, usuario)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;
    const result = await pool.query(query, [nombre, descripcion, pregunta, fechaCreacion, estado, fechaCierre, usuario]);
    return result.rows[0];
}

async function obtenerFormularios() {
    const query = `
        SELECT id, nombre, descripcion FROM formularios;
    `;
    const result = await pool.query(query);
    return result.rows;
}

async function obtenerFormularioPorId(id) {
    const query = `
        SELECT * FROM formularios
        WHERE id = $1;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
        throw new Error('Formulario no encontrado');
    }
    return result.rows[0];
}


async function cerrarFormulario(id, fechaCierre) {
    const query = `
        UPDATE formularios
        SET estado = false, fecha_cierre = $2
        WHERE id = $1
        RETURNING *;
    `;
    const result = await pool.query(query, [id, fechaCierre]);
    return result.rows[0];
}

async function formularioAbierto(id) {
    const query = `SELECT estado FROM formularios WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    crearFormulario,
    obtenerFormularios,
    obtenerFormularioPorId,
    cerrarFormulario,
    formularioAbierto
};