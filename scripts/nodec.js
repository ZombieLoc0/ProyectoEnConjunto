// Crear un nuevo diagrama GoJS. variable $ que es una función de GoJS para crear objetos gráficos.
var $ = go.GraphObject.make;

var diagram = $(go.Diagram, "diagramDiv", {
    initialContentAlignment: go.Spot.Center,  //establece que el contenido del diagrama se alinee al centro del área del diagrama.
    "undoManager.isEnabled": true //se habilita esta funcionalidad de deshacer y rehacer en el diagrama.
});

// Definir las plantillas para los nodos y enlaces
diagram.nodeTemplate =
$(go.Node, "Auto", // Utiliza la función $ de GoJS para crear un nuevo objeto de nodo (go.Node)
$(go.Panel, "Vertical",  // Usar un Panel Vertical para colocar la imagen y el texto uno debajo del otro
    $(go.Picture,  // Usar Picture en lugar de Shape para mostrar imágenes
        {
            margin: 0,
            width: 50,
            height: 50,
            imageStretch: go.GraphObject.Uniform  // La imagen se debe estirar uniformemente para ajustarse al tamaño del nodo.
        },
        new go.Binding("source", "type", function(type) {
            // Mapear el tipo de nodo al archivo de imagen correspondiente
            switch (type) {
                case "Router": return "images/router.png";
                case "Switch": return "images/switch.png";
                //case "PC": return "images/pc.png";
                //default: return "default.png";  // Imagen por defecto
            }
        })),
    $(go.TextBlock, { margin: 8 }, new go.Binding("text", "key"))  // También dentro del Panel Vertical, se define un objeto go.TextBlock que se utiliza para mostrar el texto (la clave del nodo).
)
);


diagram.linkTemplate =
    $(go.Link,
        $(go.Shape),
        $(go.Shape, { toArrow: "Standard" })
    );

// Recibir el JSON para crear la topología de red
function loadNetworkTopology(jsonData) {
    var nodos = jsonData.nodes;
    var link = jsonData.links;

    diagram.model = new go.GraphLinksModel(nodos, link);
}

// Cargar la topología de red desde la API
fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
        loadNetworkTopology(data);
    })
    .catch(error => {
        console.error('Error fetching the JSON data from API:', error);
    });

/*  //Cargar la topología de red desde un archivo JSON
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        loadNetworkTopology(data);
    })
    .catch(error => {
        console.error('Error fetching the JSON data:', error);
    });*/