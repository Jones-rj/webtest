require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static files from project folder
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web.html'));
});

// ✅ Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error("❌ Database connection failed:", err);
        return;
    }
    console.log("✅ Connected to MySQL database");
});

// ✅ Save Score
app.post('/save-score', (req, res) => {
    const { username, score } = req.body;
    if (!username || score === undefined) {
        return res.status(400).json({ error: 'Invalid data' });
    }
    db.query('INSERT INTO scores (username, score) VALUES (?, ?)', [username, score], (err) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json({ message: 'Score saved' });
    });
});

// ✅ Get Leaderboard
app.get('/leaderboard', (req, res) => {
    db.query('SELECT username, score FROM scores ORDER BY score DESC LIMIT 10', (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
});




// ✅ Like Button Functionality
app.get('/get-likes', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    db.query('SELECT count FROM likes WHERE date = ?', [today], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: results.length > 0 ? results[0].count : 0 });
    });
});

// ✅ Increment Amen Count
app.post('/like', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    db.query('INSERT INTO likes (date, count) VALUES (?, 1) ON DUPLICATE KEY UPDATE count = count + 1', 
    [today], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Amen counted!' });
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
