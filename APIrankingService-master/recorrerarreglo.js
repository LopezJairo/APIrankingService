const axios = require('axios');

const endpointUrl = 'https://localhost:3001/ranking'; // Sustituye por la URL de tu endpoint
fetchAndProcessData(endpointUrl)
  .then((sortedData) => {
    console.log('Datos ordenados:', sortedData);
  })
  .catch((error) => {
    console.error('Error general:', error);
  });

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
      // Puedes realizar aquí cualquier transformación necesaria
      return {
        id: item.id,         // Mantener o transformar las propiedades necesarias
        name: item.name,     // Por ejemplo: 'name' o cualquier otro campo relevante
        score: item.score    // Incluye el campo que usaremos para ordenar
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


