const FormularioService = require('../services/formularioService');
const FormularioDTO = require('../dtos/FormularioDTO');
const ResponseUtil = require('../utils/responseUtil');

const crearFormulario = async (req, res) => {
    try {
        const { formulario, opciones } = req.body;

        if (!formulario || !Array.isArray(opciones)) {
            return res.status(400).json(
                ResponseUtil.buildErrorResponse(400, 'Datos del formulario incompletos')
            );
        }

        let usuario = "user_token";
        
        const resultado = await FormularioService.crearFormulario(usuario, formulario, opciones);

        res.status(201).json(
            ResponseUtil.buildSuccessResponse(201, 'Formulario creado exitosamente', resultado)
        );
    } catch (error) {
        console.error('Error al crear formulario:', error);
        res.status(500).json(
            ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
        );
    }
};

const obtenerFormularios = async (req, res) => {
    FormularioService.obtenerFormularios()
        .then(formularios => {
            res.status(200).json(
                ResponseUtil.buildSuccessResponse(200, 'Formularios obtenidos exitosamente', formularios)
            );
        })
        .catch(error => {
            console.error('Error al obtener formularios:', error);
            res.status(500).json(
                ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
            );
        });
};

const cerrarFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            res.status(404).json(
                ResponseUtil.buildErrorResponse(400, 'Faltan parametros')
            );
        }

        const resultado = await FormularioService.cerrarFormulario(id);
        
        res.status(200).json(
            ResponseUtil.buildSuccessResponse(200, 'Formulario cerrado exitosamente', resultado)
        );

    } catch (error) {
        console.error('Error al obtener cerrar el formulario:', error);
        res.status(500).json(
            ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
        );
    }
}

const obtenerFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            return res.status(400).json(
                ResponseUtil.buildErrorResponse(400, 'Faltan parametros')
            );
        }

        const resultado = await FormularioService.obtenerFormularioPorId(id);

        return res.status(200).json(
            ResponseUtil.buildSuccessResponse(200, 'Formulario obtenido exitosamente', resultado)
        );
    } catch (error) {
        console.error('Error al consultar el formulario:', error);
        return res.status(500).json(
            ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
        );
    }
    
}

module.exports = {
    crearFormulario,
    obtenerFormularios,
    cerrarFormulario,
    obtenerFormulario
};