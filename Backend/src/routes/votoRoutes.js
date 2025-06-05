const express = require('express');
const router = express.Router();
const VotoController = require('../controllers/votoController')

router.post('/', VotoController.crearVoto);
router.get('/votantes/:id', VotoController.obtenerVotantes);
router.get('/:id', VotoController.obtenerVotos);

module.exports = router;