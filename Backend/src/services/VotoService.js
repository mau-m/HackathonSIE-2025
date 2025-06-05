const VotoDAO = require('../daos/VotoDAO')

async function crearVoto(voto) {
    if(!voto.usuario || !voto.formularioId || !voto.opcionId) {
        throw new Error('Datos del formulario incompletos');
    }

    let fechaCreacion = Date()
    const voto = await VotoDAO.crearVoto(
        voto.usuario,
        voto.formularioId,
        voto.opcionId,
        fechaCreacion
    )

    
}