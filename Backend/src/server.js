const express = require('express');
const cors = require('cors');
const formularioRoutes = require('./routes/formularioRoutes');
const votoRoutes = require('./routes/votoRoutes');
const path = require('path');

const port = process.env.PORT || 3000;
// Inicializar la aplicación Express

const app = express();
app.set('port', port);

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas protegidas (ejemplo con token)
app.use('/api/v1/formulario', formularioRoutes); //FALTA AGREGAR EL MIDDLEWARE DEL TOKEN
app.use('/api/v1/voto', votoRoutes); //FALTA AGREGAR EL MIDDLEWARE DEL TOKEN

// Ruta por defecto
app.get('/', (req, res) => {
    res.send('API de Formularios en funcionamiento ✅');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});