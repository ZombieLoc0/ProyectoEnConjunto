var id= null;
var data = null;
var key = null;
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
        <strong>Hostname: </strong> ${data.hostname}<br>
        <strong>Versión: </strong> ${data.version}<br>
        <strong>Tipo: </strong> ${data.type}<br>
        <strong>Cpu Usada: </strong> ${data.cpu}<br>
        <strong>Flash: </strong>Total: ${data.flash.size} <br> Libre: ${data.flash.free}<br>
        <strong>Ram: </strong>Total: ${data.ram.size} <br> Libre: ${data.ram.free}<br>
        <strong>Modelo: </strong> ${data.model}<br>
        <strong>Interfaces: </strong><br>
            <ul class="interfaces-list" style = "display: none;">`; // Añadir una clase al UL para poder seleccionarlo fácilmente

     // Iterar sobre los elementos del array int_ips y agregarlos al HTML
     data.int_ips.forEach(function(interfaceData) {
        nodeInfoHTML += `<li>${interfaceData.interface}: ${interfaceData.ip_address}</li>`;
    });
    // Cerrar las etiquetas UL
    nodeInfoHTML += `
            </ul>
        </li>
    </ul>
    <button class="interfaces-btn" "interfaces-btn" onclick="toggleInterfaces()">Mostrar/Ocultar Interfaces</button>`; // Agregar un botón para mostrar/ocultar interfaces
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
// Función para mostrar u ocultar las interfaces
function toggleInterfaces() {
    var interfacesList = document.querySelector('.interfaces-list'); // Seleccionar la lista de interfaces

    if (interfacesList.style.display === 'none') {
        interfacesList.style.display = 'block'; // Mostrar las interfaces si están ocultas
    } else {
        interfacesList.style.display = 'none'; // Ocultar las interfaces si están visibles
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
// Función para aplicar una versión
function aplicarVersion(versionText) {
    // Guardar el texto de la versión en una variable
    var versionSeleccionada = versionText;
    console.log('Versión seleccionada:', versionSeleccionada);
    var versionData = {
        ip: key,
        command: versionSeleccionada
    };
    console.log(versionData);
    fetch("http://localhost:5000/send-config", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(versionData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error al enviar la configuración:', error);
    });
}
function NodoVersion(nodo){
    data=nodo.data;
    key=data.key;
}
function diagrama() {
    // Primero, elimina el diagrama existente si lo hay
    var existingDiagram = go.Diagram.fromDiv(document.getElementById("myDiagramDiv"));
    if (existingDiagram !== null) {
        existingDiagram.div = null;
    }
    
    console.log("se llamó a la función");
    var $ = go.GraphObject.make;
    var myDiagram =
    $(go.Diagram, "myDiagramDiv", {
        initialContentAlignment: go.Spot.Center,
        "undoManager.isEnabled": true
    });

    // Definir las plantillas para los nodos y enlaces
    myDiagram.nodeTemplate =
    $(go.Node, "Auto", {
        click: function(e, node) {
            handleClick(node);
            dimeNodo(node);
            agregarDatosDesdeConfJson(id);
            NodoVersion(node);
        }
    }, 
    $(go.Panel, "Vertical", 
        $(go.Picture, 
            {
                margin: 50,
                width: 50,
                height: 50,
                imageStretch: go.GraphObject.Uniform
            },
            new go.Binding("source", "type", function(type) {
                switch (type) {
                    case "Router": return "images/router.png";
                    case "Switch": return "images/switch.png";
                    case "Multicapa": return "images/multicapa.png";
                    case "NAT": return "images/nat.png";
                }
            })
        ),
        $(go.TextBlock, { margin: 8 }, new go.Binding("text"))
    ));

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
    $(go.TextBlock,
    { segmentOffset: new go.Point(-50, -10), textAlign: "center" },
    new go.Binding("text", "t1")),
    $(go.TextBlock,
    { segmentOffset: new go.Point(50, 10), textAlign: "center" },
    new go.Binding("text", "t2"))
    );

    // Cargar datos del diagrama desde la API
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            myDiagram.model = new go.GraphLinksModel(data.nodes, data.links);
        });
}
// Función para manejar el evento de clic en el nodo
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
                var confDataHTML = `<h2 class = "tversiones">Versiones</h2><ul>`;
                        
                // Iterar sobre las versiones y agregarlas a la lista HTML
                Object.keys(confData).forEach(key => {
                    // Verificar si la clave es una versión (comienza con "version")
                    if (key.startsWith('version')) {
                        confDataHTML += `<li><strong>${key}:</strong> ${confData[key]}<button class="versions">Aplicar versión</button></li>`;
                    }
                });

                confDataHTML += `</ul>`;
                
                // Insertar la información de conf.json en el elemento HTML
                nodeInfoElement.innerHTML += confDataHTML;

                // Asignar los manejadores de eventos a los botones de "Aplicar versión"
                var buttons = document.querySelectorAll('.versions');
                buttons.forEach(button => {
                    button.addEventListener('click', function() {
                        aplicarVersion(this.previousSibling.textContent.trim());
                    });
                });
            } else {
                console.error(`La clave ${id} no existe en conf.json`);
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de conf.json:', error);
        });
        }