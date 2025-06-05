const FormularioDAO = require('../daos/formularioDAO');
const OpcionDAO = require('../daos/opcionDAO');
const FormularioDTO = require('../dtos/FormularioDTO');
const MissingValueError = require('../errors/MissingValueFormError');
const InvalidValueError = require('../errors/InvalidValueFormError');
const NotFoundFormError = require('../errors/NotFoundFormError');

async function crearFormulario(usuario, formulario, opciones) {
    
    if (!usuario || !formulario.nombre || !formulario.descripcion || !formulario.pregunta) {
        throw new MissingValueError('Datos del formulario incompletos');
    }
    if (!Array.isArray(opciones) || opciones.length === 0) {
        throw new InvalidValueError('Opciones del formulario deben ser un arreglo no vacío');
    }

    let fechaCreacion = new Date();

    const nuevoFormulario = await FormularioDAO.crearFormulario(
        formulario.nombre,
        formulario.descripcion,
        formulario.pregunta,
        fechaCreacion,
        true,
        null,
        usuario
    );

    const formularioId = nuevoFormulario.id;

    const opcionesCreadas = [];
    for (const opcion of opciones) {
        const opcionCreada = await OpcionDAO.crearOpcion(formularioId, opcion.opcion);
        opcionesCreadas.push(opcionCreada);
    }

    return new FormularioDTO(nuevoFormulario, opcionesCreadas);
}

async function obtenerFormularios() {
    const formularios = await FormularioDAO.obtenerFormularios();
    if (!formularios || formularios.length === 0) {
        throw new NotFoundFormError('No se encontraron formularios');
    }

    return formularios;
}

async function obtenerFormularioPorId(id) {
    if (!id) {
        throw new MissingValueError('Falta el parámetro id');
    }
    if (isNaN(id) || id <= 0 || id % 1 !== 0) {
        throw new InvalidValueError('Tipo de dato inválido para el parámetro id');
    }

    const formulario = await FormularioDAO.obtenerFormularioPorId(id);
    if (!formulario || formulario.length === 0) {
        throw new NotFoundFormError('Formulario no encontrado');
    }

    const opciones = await OpcionDAO.obtenerOpcionesPorFormularioId(id);
    if (!opciones || opciones.length === 0) {
        throw new NotFoundFormError('No se encontraron opciones para el formulario');
    }

    return {
        formulario: {
            id: formulario.id,
            nombre: formulario.nombre,
            descripcion: formulario.descripcion,
            pregunta: formulario.pregunta,
            estado: formulario.estado
        },
        opciones: opciones.map(opcion => ({
            id: opcion.id,
            opcion: opcion.opcion
        }))
    };
}


async function cerrarFormulario(id) {

    if (!id) {
        throw new MissingValueError('Falta el parámetro id');
    }
    const consulta = await FormularioDAO.formularioAbierto(id);
    console.log('Consulta:', consulta);

    if (!consulta || consulta.estado === false) {
        throw new NotFoundFormError('Formulario no encontrado o ya cerrado');
    }

    const fechaCierre = new Date();
    const formularioCerrado = await FormularioDAO.cerrarFormulario(id, fechaCierre);

    if (!formularioCerrado) {
        throw new NotFoundFormError('Formulario no encontrado o ya cerrado');
    }

    const respuesta = {
        id: formularioCerrado.id,
        nombre: formularioCerrado.nombre,
        estado: formularioCerrado.estado,
        fechaCierre: formularioCerrado.fecha_cierre
    };
    return respuesta;
}

module.exports = {
    crearFormulario,
    obtenerFormularios,
    obtenerFormularioPorId,
    cerrarFormulario
};