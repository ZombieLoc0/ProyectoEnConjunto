const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());

// Ruta para servir el archivo data.json
app.get('/data', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data.json');
        const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        res.json(jsonData);
    } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});