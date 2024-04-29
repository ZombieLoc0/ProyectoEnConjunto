// Evento de clic en un nodo
diagram.addDiagramListener("ObjectSingleClicked", function(e) {
    var clickedPart = e.subject.part;
    // Verificar si el clic fue en un nodo
    if (clickedPart instanceof go.Node) {
        var data = clickedPart.data;
        // Mostrar la información del nodo
        showNodeInfo(data);
    }
});

// Función para mostrar la información del nodo
function showNodeInfo(nodeData) {
    // Generar información dinámica (cambia esto con la lógica de tu aplicación)
    var ipAddress = generateRandomIP();
    var interfaces = generateRandomInterfaces(); // Generar interfaces aleatorias
    var cpuUsage = Math.floor(Math.random() * 101); // Generar uso de CPU aleatorio (0-100%)
    var memoryUsage = Math.floor(Math.random() * 101); // Generar porcentaje de memoria aleatorio (0-100%)

    // Mostrar la información en el elemento HTML
    document.getElementById("nodeInfo").innerHTML = `
        <h2>Información del Dispositivo</h2>
        <ul id="info-devices">
            <strong>Marca:</strong> ${nodeData.brand}<br><br>
            <strong>Modelo:</strong> ${nodeData.model}<br><br>
            <strong>Dirección IP:</strong> ${ipAddress}<br><br>
            <strong>Interfaces Conectadas:</strong> ${interfaces.join(', ')}<br><br>
            <strong>Uso de CPU:</strong> ${cpuUsage}%<br><br>
            <strong>Porcentaje de Memoria Disponible:</strong> ${memoryUsage}%</li>
        </ul>
    `;
}

// Generar una dirección IP aleatoria (solo como ejemplo)
function generateRandomIP() {
    var ip = [];
    for (var i = 0; i < 4; i++) {
        ip.push(Math.floor(Math.random() * 256));
    }
    return ip.join('.');
}

// Generar interfaces aleatorias
function generateRandomInterfaces() {
    var numInterfaces = Math.floor(Math.random() * 5) + 1; // Generar un número aleatorio de interfaces (1-5)
    var interfaces = [];
    for (var i = 0; i < numInterfaces; i++) {
        interfaces.push("Serial " + (i + 1));
    }
    return interfaces;
}



