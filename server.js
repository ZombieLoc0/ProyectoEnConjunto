//server.js

//API para recibir,modificar y enviar json
const express = require('express');
const cors = require('cors');
const path = require('path');
var fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud como JSON



// Ruta para servir el archivo data.json
app.get('/data', (req, res) => {
    try {
        const dataPath = path.join(__dirname, 'data.json');
        const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        // Eliminar enlaces duplicados
        const uniqueLinks = removeDuplicateLinks(jsonData.links);

        // Actualizar el JSON con los enlaces únicos
        jsonData.links = uniqueLinks;

        res.json(jsonData);
    } catch (error) {
        console.error('Error reading data.json:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para recibir un JSON mediante POST y enviarlo por GET
app.post('/update-data', (req, res) => {
    try {
        var receivedData = req.body; // Datos recibidos en el cuerpo de la solicitud POST
        console.log('Datos recibidos:', receivedData);

        // Escribir los datos recibidos en el archivo data.json
        const dataPath = path.join(__dirname, '/data.json');
        fs.writeFileSync(dataPath, JSON.stringify(receivedData, null, 4));

        // Envía los datos recibidos como respuesta a través de la ruta GET /data
        res.redirect(303, '/data');
    } catch (error) {
        console.error('Error al escribir en data.json:', error);
        res.status(400).json({ error: 'Error al escribir en data.json' });
    }
});

// Función para eliminar enlaces duplicados, considerando enlaces invertidos como duplicados
function removeDuplicateLinks(links) {
    const uniqueLinks = [];
    const addedLinks = new Set(); // Usar un conjunto para mantener un registro de enlaces agregados

    links.forEach(link => {
        // Convertir la dirección del enlace a un formato normalizado para comparación
        const normalizedLink = normalizeLink(link);
        // Verificar si el enlace o su versión invertida ya ha sido agregado
        if (!addedLinks.has(normalizedLink) && !addedLinks.has(normalizedLink.split("-").reverse().join("-"))) {
            uniqueLinks.push(link);
            addedLinks.add(normalizedLink);
        }
    });

    return uniqueLinks;
}

function normalizeLink(link) {
    const from = link.from;
    const to = link.to;
    const t1 = link.t1;
    const t2 = link.t2;

    // Ordenar los nodos y los valores de t1 y t2 en la dirección del enlace y concatenarlos
    const sortedNodes = [from, to].sort();
    const sortedPorts = [t1, t2].sort();

    return `${sortedNodes[0]}-${sortedNodes[1]}-${sortedPorts[0]}-${sortedPorts[1]}`;
}
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});





