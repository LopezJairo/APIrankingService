const { Pool } = require('pg');

// Configura tu conexión a la base de datos
const pool = new Pool({
    user: 'postgres',          // Cambia por tu usuario
    host: 'localhost',           // Cambia si es necesario
    database: 'db_ranking',    // Cambia por tu base de datos
    password: 'password',   // Cambia por tu contraseña
    port: 5432,                  // Puerto por defecto
});

// Obtener rankings
exports.getRankings = async () => {
    const res = await pool.query('SELECT * FROM rankings ORDER BY score DESC LIMIT 10');
    return res.rows;
};

// Actualizar rankings basado en las órdenes de los últimos 7 días
exports.updateRanking = async (startDate, endDate) => {
    const res = await pool.query(`
        SELECT item_id, COUNT(*) as count
        FROM orders
        WHERE order_date BETWEEN $1 AND $2
        GROUP BY item_id
        ORDER BY count DESC
        LIMIT 10;
    `, [startDate, endDate]);

    const rankings = res.rows;

    return rankings;
};
