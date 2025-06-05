const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/formularioController');

router.post('/', FormularioController.crearFormulario);

router.get('/', FormularioController.obtenerFormularios);

router.get('/:id', FormularioController.obtenerFormulario);

router.delete('/:id', FormularioController.cerrarFormulario);

module.exports = router;