const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'admin',
  host: '127.0.0.1',
  database: 'my_database',
  password: 'root',
  port: 5444, 
});

app.post('/add-phone', async (req, res) => {
  const { phone } = req.body;
  console.log("Запрос для номера:", phone);

  try {
    // Пробуем вставить
    const result = await pool.query(
      'INSERT INTO users (phone) VALUES ($1) RETURNING *',
      [phone]
    );
    res.json({ status: 'success', message: 'Registered', user: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      // ЕСЛИ НОМЕР УЖЕ ЕСТЬ: не кидаем ошибку в консоль, а отвечаем клиенту "ОК"
      console.log("Номер уже в базе, пропускаем как вход");
      res.json({ status: 'success', message: 'Login' }); 
    } else {
      // Если реально что-то сломалось (база упала и т.д.)
      console.error("Ошибка БД:", err);
      res.status(500).json({ error: 'Database error' });
    }
  }
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));