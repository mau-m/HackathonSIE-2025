const pool = require('../config/db');

async function crearVoto(usuario, formularioId, opcionId) {
    const query = `INSERT INTO votos (usuario, formulario_id, opcion_id)
    VALUES ($1, $2, $3)
    RETURNING *`;

    const result = await pool.query(query, [usuario, formularioId, opcionId]);
    return result.rows[0];
}

async function votantes(id) {
    const query = `SELECT usuario, fecha_voto FROM votos WHERE formulario_id = $1`;
    const result = await pool.query(query, [id]);

    return result.rows;
}

async function obtenerVotos(id) {
    const query = `
        SELECT o.opcion AS nombre, COUNT(v.id) AS total_votos
        FROM opciones o
        LEFT JOIN votos v ON o.id = v.opcion_id AND v.formulario_id = $1
        WHERE o.formulario_id = $1
        GROUP BY o.id, o.opcion
        ORDER BY total_votos DESC;
    `;

    const result = await pool.query(query, [id]);
    return result.rows;
}

module.exports = {
    crearVoto,
    votantes,
    obtenerVotos
}