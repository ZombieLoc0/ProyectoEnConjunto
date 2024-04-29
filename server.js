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

/*
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para enviar mensajes de WhatsApp
app.post('/send-whatsapp', (req, res) => {
    const { to, message } = req.body;

    // Tu SID de cuenta y token de autenticación de Twilio
    const accountSid = 'AC632cb7addee6e821cb1ac3f1879e9b7e';
    const authToken = '2d7d23647bc1b522ca34b223e7386c26';

    // Inicializar el cliente de Twilio
    const client = twilio(accountSid, authToken);

    // Enviar el mensaje de WhatsApp
    client.messages
        .create({
            body: message,
            from: 'whatsapp:+523338066738', // Número de WhatsApp Twilio
            to: `whatsapp:${to}` // Número de destino
        })
        .then(message => {
            console.log('Mensaje de WhatsApp enviado:', message.sid);
            res.send('Mensaje de WhatsApp enviado correctamente.');
        })
        .catch(error => {
            console.error('Error al enviar el mensaje de WhatsApp:', error);
            res.status(500).send('Ocurrió un error al enviar el mensaje de WhatsApp.');
        });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});

function enviarMensajeWhatsApp() {
    const to = '523315347242'; // Número de destino
    const message = 'Este es un mensaje de prueba desde mi página web.';

    fetch('http://localhost:3000/send-whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `to=${to}&message=${encodeURIComponent(message)}`
    })
    .then(response => {
        if (response.ok) {
            alert('Mensaje de WhatsApp enviado correctamente.');
        } else {
            throw new Error('Error al enviar el mensaje de WhatsApp.');
        }
    })
    .catch(error => {
        console.error(error);
        alert('Ocurrió un error al enviar el mensaje de WhatsApp.');
    });
}
*/