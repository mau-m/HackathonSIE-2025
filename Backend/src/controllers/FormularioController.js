const FormularioService = require('../services/FormularioService');
const FormularioDTO = require('../dtos/FormularioDTO');

const crearFormulario = async (req, res) => {
    try {
        const { formulario, opciones } = req.body;

        if (!formulario || !Array.isArray(opciones)) {
            return res.status(400).json({ message: 'Datos del formulario incompletos' });
        }

        //const dto = new FormularioDTO(formulario, opciones);
        const resultado = await FormularioService.crearFormulario(formulario, opciones);
        if (!resultado) {
            return res.status(400).json({ message: 'Error al crear el formulario' });
        }

        res.status(201).json(resultado);
    } catch (error) {
        console.error('Error al crear formulario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const obtenerFormularios = async (req, res) => {
    FormularioService.obtenerFormularios()
        .then(formularios => {
            if (!formularios || formularios.length === 0) {
                return res.status(404).json({ message: 'No se encontraron formularios' });
            }
            res.status(200).json(formularios);
        })
        .catch(error => {
            console.error('Error al obtener formularios:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        });
};

const cerrarFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(404).json({ message: 'Falta el parametro id' });
        }

        const resultado = await FormularioService.cerrarFormulario(id);

        return res.status(200).json(resultado[0]);

    } catch (error) {
        console.error('Error al obtener cerrar el formulario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

const obtenerFormulario = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(!id) {
            return res.status(404).json({ message: 'Datos incompletos' });
        }

        const resultado = await FormularioService.obtenerFormularioPorId(id);
        if (!resultado) {
            return res.status(404).json({ message: 'No existe el formulario' });
        }

        return res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al consultar el formulario:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
    
}

module.exports = {
    crearFormulario,
    obtenerFormularios,
    cerrarFormulario,
    obtenerFormulario
};