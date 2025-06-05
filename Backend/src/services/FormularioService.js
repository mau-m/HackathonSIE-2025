const FormularioDAO = require('../daos/FormularioDAO');
const OpcionDAO = require('../daos/OpcionDAO');
const FormularioDTO = require('../dtos/FormularioDTO');
const FormularioResponseDTO = require('../dtos/FormularioResponseDTO');

async function crearFormulario(formulario, opciones) {
    //const { formulario, opciones } = formularioDTO;
    if (!formulario.nombre || !formulario.descripcion || !formulario.pregunta) {
        throw new Error('Datos del formulario incompletos');
    }
    if (!Array.isArray(opciones) || opciones.length === 0) {
        throw new Error('Opciones del formulario deben ser un arreglo no vacío');
    }

    let fechaCreacion = new Date();

    const nuevoFormulario = await FormularioDAO.crearFormulario(
        formulario.nombre,
        formulario.descripcion,
        formulario.pregunta,
        fechaCreacion,
        true,
        null
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
        throw new Error('No se encontraron formularios');
    }

    return formularios
    //return formularios.map(f => new FormularioResponseDTO(f));
}

async function obtenerFormularioPorId(id) {
    if (!id) {
        throw new Error('Falta el parámetro id');
    }
    if (isNaN(id)) {
        throw new Error('El id debe ser un número');
    }
    id = Number(id);
    if (id <= 0) {
        throw new Error('El id debe ser un número positivo');
    }
    if (id % 1 !== 0) {
        throw new Error('El id debe ser un número entero');
    }

    const formulario = await FormularioDAO.obtenerFormularioPorId(id);
    if (!formulario || formulario.length === 0) {
        throw new Error('Formulario no encontrado');
    }

    const opciones = await OpcionDAO.obtenerOpcionesPorFormularioId(id);
    if (!opciones || opciones.length === 0) {
        throw new Error('No se encontraron opciones para el formulario');
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
        throw new Error('Falta el parámetro id');
    }
    const consulta = await FormularioDAO.formularioAbierto(id);
    if (!consulta || consulta.estado === false) {
        throw new Error('Formulario no encontrado o ya cerrado');
    }

    const fechaCierre = new Date();
    const formularioCerrado = await FormularioDAO.cerrarFormulario(id, fechaCierre);

    if (!formularioCerrado) {
        throw new Error('Formulario no encontrado o ya cerrado');
    }

    return formularioCerrado;
}

module.exports = {
    crearFormulario,
    obtenerFormularios,
    obtenerFormularioPorId,
    cerrarFormulario
};