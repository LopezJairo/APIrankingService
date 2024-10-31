const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const router = express.Router();

const pool = new Pool({
    user: 'postgres',          
    host: 'localhost',         
    database: 'db_ranking',    
    password: 'password',     
    port: 5432,                
});

// Middleware para analizar JSON
router.use(bodyParser.json());

// Ruta para obtener rankings
router.get('/rankings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rankings ORDER BY score DESC');
        const rankings = result.rows;

        // Imprimir en la terminal los rankings de mayor a menor
        console.log('Rankings de mayor a menor:');
        rankings.forEach(ranking => {
            console.log(`Item ID: ${ranking.item_id}, Score: ${ranking.score}`);
        });

        res.json(rankings);
    } catch (error) {
        console.error('Error al obtener rankings:', error);
        res.status(500).send('Error al obtener rankings');
    }
});

// Crear un nuevo ranking
router.post('/rankings', async (req, res) => {
    try {
        const { item_id, score } = req.body;
        const result = await pool.query(
            'INSERT INTO rankings (item_id, score) VALUES ($1, $2) RETURNING *',
            [item_id, score]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al crear ranking:', err);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
