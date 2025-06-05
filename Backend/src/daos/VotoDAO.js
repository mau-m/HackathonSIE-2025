const pool = require('../config/db');

async function crearVoto(usuario, formularioId, opcionId, fechaVoto) {
    const query = `INSERT INTO votos (usuariom formulario_id, opcion_id, fecha_voto)
    VALUES ($1, $2, $3, $4)
    RETURNING *`;

    const result = await pool.query(query, [usuario, formularioId, opcionId, fechaVoto]);
    return result.rows[0];
}

async function obtenerVotos(id, formularioId) {
    const query = `SELECT count(*) FROM opciones WHERE id = $1 AND formulario_id = $2`;
    const result = await pool.query(query, [id, formularioId]);
    return result.rows[0];
}

module.exports = {
    crearVoto
}