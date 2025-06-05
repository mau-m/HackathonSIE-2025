const pool = require('../config/db');

async function crearOpcion(formularioId, opcion) {
    const query = `
        INSERT INTO opciones (formulario_id, opcion)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const result = await pool.query(query, [formularioId, opcion]);
    return result.rows[0];
}

async function obtenerOpcionesPorFormularioId(formularioId) {
    const query = `
        SELECT * FROM opciones
        WHERE formulario_id = $1;
    `;
    const result = await pool.query(query, [formularioId]);
    return result.rows;
}

module.exports = {
    crearOpcion,
    obtenerOpcionesPorFormularioId
};