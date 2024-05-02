
function init() {
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
                            //case "PC": return "images/pc.png";
                            default: return ".png";  // Imagen por defecto
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

// Cargar datos del diagrama desde la API
fetch('http://localhost:3000/data') // Cambia la URL según sea necesario
    .then(response => response.json())
    .then(data => {
        myDiagram.model = new go.GraphLinksModel(data.nodes, data.links);
    });
}
            

