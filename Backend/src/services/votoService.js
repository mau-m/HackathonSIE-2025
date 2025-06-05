const VotoDAO = require('../daos/votoDAO');

async function crearVoto(usuario, formularioId, opcionId) {
    const resultado = await VotoDAO.crearVoto(
        usuario,
        formularioId,
        opcionId
    );

    return resultado;
}

async function votantes(id) {
    const resultado = await VotoDAO.votantes(id);
    return resultado;
}

async function obtenerVotos(id) {
    const resultado = await VotoDAO.obtenerVotos(id);
    return resultado;
}

module.exports = {
    crearVoto,
    votantes,
    obtenerVotos
}
