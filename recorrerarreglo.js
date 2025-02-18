// Simular 100 clientes y sus órdenes
function generarOrdenesClientes(numClientes, numItems) {
  const ordenes = [];
  
  for (let i = 0; i < numClientes; i++) {
    const numItemsOrden = Math.floor(Math.random() * 10) + 1; // Cada cliente compra entre 1 y 10 ítems
    const items = [];
    
    for (let j = 0; j < numItemsOrden; j++) {
      const itemId = `item_${Math.floor(Math.random() * numItems) + 1}`; // Generar item_id
      const rankingScore = Math.floor(Math.random() * 100) + 1; // Generar ranking_score entre 1 y 100
      items.push({ id: itemId, ranking_score: rankingScore });
    }
    
    ordenes.push({ clienteId: `cliente_${i + 1}`, items });
  }
  
  return ordenes;
}

// Generar datos de prueba
const ordenesUltimos7Dias = generarOrdenesClientes(100, 50); // 100 clientes, 50 ítems únicos

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
  items.forEach(item => {
    console.log(`Actualizando base de datos: ID=${item[0]}, Cantidad=${item[1]}`);
  });
}

// Ejecución del algoritmo
const mapaItems = crearMapaItems(ordenesUltimos7Dias);
const top10Items = obtenerTop10Items(mapaItems);
actualizarBaseDatos(top10Items);

