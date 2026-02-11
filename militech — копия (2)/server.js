const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Раздает HTML/CSS/JS

// 1. Регистрация
app.post('/api/register', async (req, res) => {
    const { name, role, spec, exp, about, city } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO users (name, role, specialization, experience, about, city) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, role, spec, exp, about, city]
        );
        res.json({ success: true, user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 2. Получить профиль
app.get('/api/user/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length > 0) res.json(result.rows[0]);
        else res.status(404).json({ error: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Обновить профиль
app.post('/api/update-profile', async (req, res) => {
    const { id, name, city, phone, spec, role, about } = req.body;
    try {
        await db.query(
            `UPDATE users SET name=$1, city=$2, phone=$3, specialization=$4, role=$5, about=$6 WHERE id=$7`,
            [name, city, phone, spec, role, about, id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));