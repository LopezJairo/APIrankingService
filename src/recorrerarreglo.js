const ordenesUltimos7Dias = obtenerOrdenesUltimos7Dias();

// Función para crear un mapa de ítems y sus cantidades
function crearMapaItems(ordenes) {
  const mapaItems = new Map();
  ordenes.forEach(orden => {
    orden.items.forEach(item => {
      mapaItems.set(item.id, (mapaItems.get(item.id) || 0) + 1);
    });
  });
  return mapaItems;
}

// Función para ordenar el mapa por valor y obtener los 10 primeros
function obtenerTop10Items(mapaItems) {
  const itemsOrdenados = [...mapaItems.entries()].sort((a, b) => b[1] - a[1]);
  return itemsOrdenados.slice(0, 10);
}

// Función para actualizar la información de cada ítem en la base de datos
function actualizarBaseDatos(items) {
  // Aquí implementarías la lógica para actualizar la base de datos local
  // Suponiendo que tienes una función 'guardarItem'
  items.forEach(item => {
    guardarItem(item[0], item[1]); // item[0] es el id, item[1] es la cantidad
  });
}

// Ejecución del algoritmo
const mapaItems = crearMapaItems(ordenesUltimos7Dias);
const top10Items = obtenerTop10Items(mapaItems);
actualizarBaseDatos(top10Items);