<<<<<<< HEAD
// info-devices.js

// Función para mostrar la información del dispositivo
function showDeviceInfo(deviceKey) {
    // Buscar el dispositivo en el JSON por su clave
    const device = jsonData.devices.find(d => d.key === deviceKey);
    
    // Mostrar la información del dispositivo en el div correspondiente
    const nodeInfoDiv = document.getElementById("nodeInfo");
    nodeInfoDiv.innerHTML = `
        <h2>Información del Dispositivo</h2>
        <p>Marca: ${device.marca}</p>
        <p>Modelo: ${device.modelo}</p>
        <p>CPU Usada: ${device.cpu_usada}</p>
        <p>Estado del Contrato: ${device.estado_contrato}</p>
        <p>Versión: ${device.version}</p>
        <p>Elegibilidad Activa: ${device.elegibilidad_act}</p>
        <p>Puertos Disponibles: ${device.puertos_disponibles}</p>
    `;
}
=======

>>>>>>> 0f81e34cf04a43a2b4a95af6b725b097649f1705

// Función para inicializar el evento de clic en los nodos del diagrama
function initNodeClickEvent(diagram) {
    diagram.addDiagramListener("ObjectSingleClicked", function(e) {
        const part = e.subject.part;
        if (part instanceof go.Node) {
            const deviceKey = part.data.key; // Obtener la clave del dispositivo
            showDeviceInfo(deviceKey); // Mostrar la información del dispositivo
        }
    });
}

/*function showNodeInfo(nodeData) {
    // Generar información dinámica (cambia esto con la lógica de tu aplicación)
    var ipAddress = generateRandomIP();
    var interfaces = generateRandomInterfaces(); // Generar interfaces aleatorias
    var cpuUsage = Math.floor(Math.random() * 101); // Generar uso de CPU aleatorio (0-100%)
    var memoryUsage = Math.floor(Math.random() * 101); // Generar porcentaje de memoria aleatorio (0-100%)

    // Mostrar la información del dispositivo en el elemento HTML
    document.getElementById("nodeInfo").innerHTML = `
        <h2>Información del Dispositivo</h2>
        <ul id="info-devices">
            <li><strong>Marca:</strong> ${nodeData.brand}</li>
            <li><strong>Modelo:</strong> ${nodeData.model}</li>
            <li><strong>Dirección IP:</strong> ${ipAddress}</li>
            <li><strong>Interfaces Conectadas:</strong> ${interfaces.join(', ')}</li>
            <li><strong>Uso de CPU:</strong> ${cpuUsage}%</li>
            <li><strong>Porcentaje de Memoria Disponible:</strong> ${memoryUsage}%</li>
        </ul>
    `;

    // Mostrar la configuración del dispositivo solo si no se ha mostrado previamente
    var existingConfigurationDiv = document.getElementById("configurationDiv");
    if (!existingConfigurationDiv) {
        var configurationDiv = document.createElement("div");
        configurationDiv.id = "configurationDiv";
        configurationDiv.classList.add("configuration-section");
        configurationDiv.innerHTML = "<h2>Configuración</h2>";

        if (nodeData.type === "Router") {
            // Configuración específica para un router
            configurationDiv.innerHTML += "<p>Configuración de router...</p>";
        } else if (nodeData.type === "Switch") {
            // Configuración específica para un switch
            configurationDiv.innerHTML += "<p>Configuración de switch...</p>";
        } else if (nodeData.type === "Multilayer Switch") {
            // Configuración específica para un switch multicapa
            configurationDiv.innerHTML += "<p>Configuración de switch multicapa...</p>";
        } else {
            // Tipo de dispositivo no reconocido
            configurationDiv.innerHTML += "<p>No se reconoce el tipo de dispositivo para mostrar la configuración.</p>";
        }

        document.getElementById("deviceInfo").appendChild(configurationDiv);
    }
}*/