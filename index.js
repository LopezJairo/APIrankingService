const express = require('express');
const bodyParser = require('body-parser');
const rankingRoutes = require('./src/routes/rankingRoutes');

const app = express();

// Middleware para analizar JSON
app.use(bodyParser.json());

// Usar las rutas de rankings
app.use('/', rankingRoutes);

// Iniciar el servidor
app.listen(3001, () => {
    console.log('Servidor escuchando en el puerto 3000...');
});