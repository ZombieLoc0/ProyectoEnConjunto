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



// Función para eliminar enlaces duplicados
function removeDuplicateLinks(links) {
    const uniqueLinks = [];
    const addedLinks = new Set(); // Usar un conjunto para mantener un registro de enlaces agregados

    links.forEach(link => {
        // Convertir la dirección del enlace a un formato normalizado para comparación
        const normalizedLink = normalizeLink(link);
        // Verificar si el enlace ya ha sido agregado
        if (!addedLinks.has(normalizedLink)) {
            uniqueLinks.push(link);
            addedLinks.add(normalizedLink);
        }
    });

    return uniqueLinks;
}
// Función para normalizar la dirección de un enlace para comparación
function normalizeLink(link) {
    const from = link.from;
    const to = link.to;
    // Ordenar los nodos en la dirección del enlace y concatenarlos
    return from < to ? `${from}-${to}` : `${to}-${from}`;
}

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



















//Codigo mensajes Twilio
// Importa el módulo Twilio para interactuar con su API
const twilio = require('twilio');

// Credenciales de autenticación de Twilio
const accountSid = 'AC197950e7e248ff96d25f214b519939f0'; // Account SID
const authToken = 'b992c9a07521c87727fc84b3474c7142';     // Auth Token

// Inicializa el cliente de Twilio con las credenciales proporcionadas
const client = twilio(accountSid, authToken);

// Utiliza el cliente de Twilio para enviar un mensaje SMS
client.messages
  .create({
    // Cuerpo del mensaje SMS
    body: 'The fucking best team enviado desde Twilio.',
    // Número de teléfono desde el cual se enviará el mensaje (tu número de Twilio)
    from: '+14015194259',
    // Número de teléfono al cual se enviará el mensaje (el destinatario)
    to: '+523334707958'
  })
  .then(message => console.log(message.sid)) // Maneja la respuesta exitosa imprimiendo el SID del mensaje
  .catch(error => console.error('Error al enviar el mensaje:', error)); // Maneja cualquier error durante el envío del mensaje


