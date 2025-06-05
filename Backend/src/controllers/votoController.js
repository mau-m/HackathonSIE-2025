const VotoService = require('../services/votoService');
const ResponseUtil = require('../utils/responseUtil');

const crearVoto = async (req, res) => {
    try {
        const voto = req.body;

        if (!voto.usuario || !voto.formularioId || !voto.opcionId) {
            res.status(400).json(
                ResponseUtil.buildErrorResponse(400, 'Datos del voto incompletos')
            );
        }

        const resultado = await VotoService.crearVoto(voto.usuario, voto.formularioId, voto.opcionId);
        res.status(201).json(
            ResponseUtil.buildSuccessResponse(201, 'Voto creado exitosamente', resultado)
        );
    } catch (error) {
        console.error('Error al crear voto:', error);
        res.status(500).json(
            ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
        );
    }
}

const obtenerVotantes = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                ResponseUtil.buildErrorResponse(400, 'Parametros faltantes')
            );
        }

        const votantes = await VotoService.votantes(id);
        res.status(200).json(
            ResponseUtil.buildSuccessResponse(200, 'Votantes obtenidos exitosamente', votantes)
        );
    } catch (error) {
        console.error('Error al obtener votantes:', error);
        res.status(500).json(
            ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
        );
    }
}

const obtenerVotos = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json(
                ResponseUtil.buildErrorResponse(400, 'Parametros faltantes')
            );
        }

        const votos = await VotoService.obtenerVotos(id);
        res.status(200).json(
            ResponseUtil.buildSuccessResponse(200, 'Votos obtenidos exitosamente', votos)
        );
    } catch (error) {
        console.error('Error al obtener votos:', error);
        res.status(500).json(
            ResponseUtil.buildErrorResponse(500, 'Error interno del servidor')
        );
    }
}

module.exports = {
    crearVoto,
    obtenerVotantes,
    obtenerVotos
};