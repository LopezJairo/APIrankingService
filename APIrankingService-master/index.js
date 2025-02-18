const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const rankingRoutes = require('./src/routes/rankingRoutes');

const app = express();
// Usar las rutas de rankings
app.use('/', rankingRoutes);

// Middleware para analizar JSON
app.use(bodyParser.json());

// Función para consumir el endpoint, procesar y devolver el JSON ordenado
async function fetchAndProcessData(endpointUrl) {
  try {
    // Realizar la solicitud al endpoint
    const response = await axios.get(endpointUrl);

    // Verificar que el arreglo está en el formato esperado
    if (!Array.isArray(response.data)) {
      throw new Error('El endpoint no devolvió un arreglo válido.');
    }

    // Utilizar map para transformar y procesar los datos
    const transformedData = response.data.map((item) => {
      return {
        id: item.item_id,      // Ajusta el nombre del campo según tu estructura
        name: `Item ${item.item_id}`, // Generar un nombre si no existe
        score: item.score      // Incluye el campo que usaremos para ordenar
      };
    });

    // Ordenar los elementos transformados por el campo 'score' en orden descendente
    const sortedData = transformedData.sort((a, b) => b.score - a.score);

    // Devolver el JSON con los elementos ordenados
    return sortedData;
  } catch (error) {
    console.error('Error al procesar los datos:', error.message);
    return { error: error.message };
  }
}

// Endpoint adicional para procesar rankings
app.get('/procesar-ranking', async (req, res) => {
  const endpointUrl = 'http://localhost:3001/ranking'; // Ajusta la URL del endpoint si es necesario
  try {
    const sortedData = await fetchAndProcessData(endpointUrl);
    res.status(200).json(sortedData); // Devolver los datos ordenados como respuesta
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar el ranking.' });
  }
});



// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor escuchando en el puerto 3001...');
});
