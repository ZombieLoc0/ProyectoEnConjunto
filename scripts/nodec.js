var id= null;
function diagrama() {
    var $ = go.GraphObject.make;

    var myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
                initialContentAlignment: go.Spot.Center,  //establece que el contenido del diagrama se alinee al centro del área del diagrama.
                "undoManager.isEnabled": true //se habilita esta funcionalidad de deshacer y rehacer en el diagrama.
        });

            // Definir las plantillas para los nodos y enlaces
            myDiagram.nodeTemplate =
        $(go.Node, "Auto", // Utiliza la función $ de GoJS para crear un nuevo objeto de nodo (go.Node)
        { click: function(e, node) { handleClick(node); dimeNodo(node); agregarDatosDesdeConfJson(id)} }, // Agregar evento de clic al nodo, la e es el evento
            $(go.Panel, "Vertical",  // Usar un Panel Vertical para colocar la imagen y el texto uno debajo del otro
                $(go.Picture,  // Usar Picture en lugar de Shape para mostrar imágenes
                    {
                        margin: 50,
                        width: 50,
                        height: 50,
                        imageStretch: go.GraphObject.Uniform  // La imagen se debe estirar uniformemente para ajustarse al tamaño del nodo.
                    },
                    new go.Binding("source", "type", function(type) {
                        // Mapear el tipo de nodo al archivo de imagen correspondiente
                        switch (type) {
                            case "Router": return "images/router.png";
                            case "Switch": return "images/switch.png";
                            case "Multicapa": return "images/multicapa.png";
                            case "NAT": return "images/nat.png";
                            //default: return ".png";  // Imagen por defecto
                        }
                    })),
                $(go.TextBlock, { margin: 8 }, new go.Binding("text"))  // , "key" También dentro del Panel Vertical, se define un objeto go.TextBlock que se utiliza para mostrar el texto (la clave del nodo).
            )
        );

// Definir la plantilla personalizada para los enlaces
myDiagram.linkTemplate =
    $(go.Link,)
    .add(
        $(go.Shape,
        { stroke: "#1e4ccb", strokeWidth: 1.5 })
    )
    .add(
        $(go.Shape,
        {
            geometryString: "M0,0 10,0 10,6 0,6 z",
            stroke: null,
            fill: "red",
            scale: 0.7,
            toArrow: "Circle"
        })
    )
    .add(
        $(go.Shape,
        {
            geometryString: "M0,0 10,0 10,6 0,6 z",
            stroke: null,
            fill: "red",
            scale: 0.7,
            fromArrow: "Circle"
        }),
    $(go.TextBlock, // Etiqueta de texto en el lado "from"
    { segmentOffset: new go.Point(-50, -10), textAlign: "center" },
    new go.Binding("text", "t1")),
    $(go.TextBlock, // Etiqueta de texto en el lado "to"
    { segmentOffset: new go.Point(50, 10), textAlign: "center" },
    new go.Binding("text", "t2"))
);

// Función para manejar el evento de clic en el nodo
// Función para manejar el evento de clic en el nodo
function handleClick(node) {
    var data = node.data; // Obtener los datos del nodo
    console.log("Clic en el nodo con ID:", data.key);
    id=data.key
    var mapContainer = document.querySelector('.map-container');
    var mainContent = document.querySelector('.main-content');

    mapContainer.style.transition = 'width 1s ease, margin-left 1s ease'; // Transición suave para el ancho y el margen izquierdo

    // Modificar el tamaño y posición del contenedor de mapa al hacer clic en el nodo
    mapContainer.style.width = '95%'; // Reducir el ancho al 80%
    mapContainer.style.marginLeft = '5%'; // Desplazar a la izquierda
    mainContent.style.marginLeft = 'auto'; // Centrar el contenido principal

    // Obtener el elemento HTML donde se mostrará la información del nodo
    var nodeInfoElement = document.getElementById('nodeInfo');
    // Crear una cadena con la información del nodo
    var nodeInfoHTML = `
    <h2>Información del Dispositivo</h2>
    <ul>
        <li><strong>ID:</strong> ${data.key}</li>
        <li><strong>Versión:</strong> ${data.version}</li>
        <li><strong>Tipo:</strong> ${data.type}</li>
        <li><strong>Cpu Usada:</strong> ${data.cpu}</li>
        <li><strong>Flash:</strong>Total: ${data.flash.size} Libre: ${data.flash.free}</li>
        <li><strong>Ram:</strong>Total: ${data.ram.size} Libre: ${data.ram.free}</li>
        <li><strong>Modelo:</strong> ${data.model}</li>
        <li><strong>Interfaces:<strong></li>

    </ul>
`;
     // Iterar sobre los elementos del array int_ips y agregarlos al HTML
     data.int_ips.forEach(function(interfaceData) {
        nodeInfoHTML += `<li>${interfaceData.interface}: ${interfaceData.ip_address}</li>`;
    });
    // Cerrar las etiquetas UL
    nodeInfoHTML += `
    </ul>
    </ul>`;
    // Insertar la información del nodo en el elemento HTML
    nodeInfoElement.innerHTML = nodeInfoHTML;

    // Mostrar el formulario de configuración adecuado según el tipo de nodo
    if (data.type === 'Router') {
        showRouterConfigForm();
        showDeviceInfo();
        showPhoneNumber();
    } else if (data.type === 'Switch') {
        showSwitchConfigForm();
        showDeviceInfo();
        showPhoneNumber();
    }
}

// Función para mostrar el formulario de configuración del router
function showRouterConfigForm() {
    document.getElementById("routerConfig").style.display = "block";
    document.getElementById("switchConfig").style.display = "none"; // Ocultar el formulario del switch si está visible
}

// Función para mostrar el formulario de configuración del switch
function showSwitchConfigForm() {
    document.getElementById("routerConfig").style.display = "none"; // Ocultar el formulario del router si está visible
    document.getElementById("switchConfig").style.display = "block";
}   

function showDeviceInfo() {
    document.getElementById("deviceInfo").style.display = "block";
} 

function showPhoneNumber() {
    document.getElementById("phoneInput").style.display = "block";
}



function agregarDatosDesdeConfJson(id) {
    // Realizar una solicitud fetch para obtener los datos de conf.json
    fetch('http://localhost:3000/conf') // Cambia la URL según sea necesario
        .then(response => response.json())
        .then(data => {
            // Verificar si la clave id existe en los datos
            if (data.hasOwnProperty(id)) {
                var nodeInfoElement = document.getElementById('nodeInfo');
                var confData = data[id];

                // Crear una cadena con la información de conf.json
                var confDataHTML = `
                    <h2>Información de conf.json</h2>
                    <ul>
                        <li><strong>Versión 1:</strong> ${confData.version1}</li>
                        <li><strong>Versión 2:</strong> ${confData.version2}</li>
                    </ul>
                `;
                // Insertar la información de conf.json en el elemento HTML
                nodeInfoElement.innerHTML += confDataHTML;
            } else {
                console.error(`La clave ${id} no existe en conf.json`);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de conf.json:', error);
        });
}
// Cargar datos del diagrama desde la API
fetch('http://localhost:3000/data') // Cambia la URL según sea necesario
    .then(response => response.json())
    .then(data => {
        myDiagram.model = new go.GraphLinksModel(data.nodes, data.links);
    });
}