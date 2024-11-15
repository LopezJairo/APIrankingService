const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost', 
  database: process.env.DB_NAME || 'rankingdb',
  password: process.env.DB_PASSWORD || 'postgres',
  port: process.env.DB_PORT || 5478,
});

module.exports = pool;

console.log(process.env.DB_HOST)