const { Pool } = require('pg');

// Configura tu conexión a la base de datos
const pool = new Pool({
    user: 'postgres',          // Cambia por tu usuario
    host: 'localhost',         // Cambia si es necesario
    database: 'db_ranking',    // Cambia por tu base de datos
    password: 'password',       // Cambia por tu contraseña
    port: 5432,                 // Puerto por defecto
});

module.exports = pool;
