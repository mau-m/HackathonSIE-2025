const VotoService = require('../services/VotoService');

const crearVoto = async (req, res) => {
    try {
        const voto = req.body;

        if (!voto.usuario || !voto.formularioId || !voto.opcionId) {
            return res.status(400).json({ message: 'Datos del voto incompletos' });
        }

        const resultado = await VotoService.crearVoto(voto);
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear voto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const obtenerVotantes = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID de formulario requerido' });
        }

        const votantes = await VotoService.votantes(id);
        res.status(200).json(votantes);
    } catch (error) {
        console.error('Error al obtener votantes:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const obtenerVotos = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'ID de opción' });
        }

        const votos = await VotoService.obtenerVotos(id);
        res.status(200).json(votos);
    } catch (error) {
        console.error('Error al obtener votos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

module.exports = {
    crearVoto,
    obtenerVotantes,
    obtenerVotos
};