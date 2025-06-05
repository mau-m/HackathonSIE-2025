const express = require('express');
const router = express.Router();
const FormularioController = require('../controllers/FormularioController');

router.post('/', FormularioController.crearFormulario);

router.get('/', FormularioController.obtenerFormularios);

router.get('/:id', FormularioController.obtenerFormulario);

router.delete('/:id', FormularioController.cerrarFormulario);
// Otros endpoints: router.get, put, delete...

module.exports = router;