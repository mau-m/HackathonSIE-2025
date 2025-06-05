const VotoDAO = require('../daos/VotoDAO')

async function crearVoto(voto) {

    let fechaCreacion = Date.now();
    const resultado = await VotoDAO.crearVoto(
        voto.usuario,
        voto.formularioId,
        voto.opcionId
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
