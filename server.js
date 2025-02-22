const express = require('express');
const mysql = require('mysql2'); 
const cors = require('cors');
const path = require('path');  

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve static files from the default project folder
app.use(express.static(__dirname));

// ✅ Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web.html')); // ✅ Serve index.html from project root
});

// ✅ Database Connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12763765',
    password: '@LITTLEflock-123',
    database: 'sql12763765'
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

// ✅ Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});




//like button functions

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get today's Amen count
app.get('/get-likes', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const query = 'SELECT count FROM likes WHERE date = ?';

    db.query(query, [today], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ count: results.length > 0 ? results[0].count : 0 });
    });
});

// Increment Amen count
app.post('/like', (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    db.query('INSERT INTO likes (date, count) VALUES (?, 1) ON DUPLICATE KEY UPDATE count = count + 1', [today], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Amen counted!' });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));

