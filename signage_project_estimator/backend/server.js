import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions));

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM materials');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to load materials' });
    }
})

app.get('/api/materials', async (req, res) => {
    try {
        const { type } = req.query;
        const result = type
            ? await pool.query(
                `SELECT id, name, category, depth_mm, pricing_unit, unit_cost
                 FROM materials
                 WHERE $1::signcomponenttype = ANY(applicable_sign_component_types)
                 ORDER BY category, depth_mm`,
                [type]
            )
            : await pool.query('SELECT * FROM materials ORDER BY category, depth_mm');
        res.json(result.rows);
    } catch (err) {
        // 22P02 = invalid enum value (e.g. ?type=Banana)
        if (err.code === '22P02') {
            return res.status(400).json({ error: 'Invalid sign component type' });
        }
        console.error(err);
        res.status(500).json({ error: 'Failed to load materials' });
    }
})

app.listen(8080, () => {
    console.log("Server running on port 8080");
})