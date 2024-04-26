document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var ip = document.getElementById("ipInput").value;
        var username = document.getElementById("usernameInput").value;
        var password = document.getElementById("passwordInput").value;

        window.location.href = "main.html";
    });
});

const mapContainer = document.querySelector('.map-container');
const mapImage = document.getElementById('mapImage');

let isDragging = false;
let startX, startY, offsetX = 0, offsetY = 0;

mapImage.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - mapImage.offsetLeft;
    startY = e.clientY - mapImage.offsetTop;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

mapContainer.addEventListener('mousemove', (e) => {
    if (isDragging) {
        e.preventDefault();
        let x = e.clientX - startX;
        let y = e.clientY - startY;
        setPosition(x, y);
    }
});

function setPosition(x, y) {
    mapImage.style.left = x + 'px';
    mapImage.style.top = y + 'px';
}

function openTab(evt, tabName) {
    // Obtener todos los elementos con la clase "tabcontent" y ocultarlos
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Obtener todos los elementos con la clase "tablinks" y quitar la clase "active"
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Mostrar el contenido de la pestaña actual y agregar la clase "active" al botón de la pestaña
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

function selectConfiguration(option) {
    var routingConfig = document.getElementById("routingConfig");
    var showConfig = document.getElementById("showConfig");
    if (option === "routing") {
        routingConfig.style.display = "block";
        showConfig.style.display = "none";
    } else if (option === "shows") {
        routingConfig.style.display = "none";
        showConfig.style.display = "block";
    } else {
        routingConfig.style.display = "none";
        showConfig.style.display = "none";
    }
}

function applyDHCPConfiguration() {
    var poolName = document.getElementById("poolName").value;
    var dhcpRange = document.getElementById("dhcpRange").value;
    var subnetMask = document.getElementById("subnetMask").value;
    var gateway = document.getElementById("gateway").value;

    // Construir el comando DHCP con el nombre del pool y los parámetros ingresados
    var dhcpCommand = "configure terminal\n" + // Entrar al modo de configuración
                      "no ip dhcp pool\n" + // Eliminar el pool DHCP existente (si lo hay)
                      "ip dhcp pool " + poolName + "\n" + // Crear un nuevo pool DHCP con el nombre especificado
                      "network " + dhcpRange + " " + subnetMask + "\n" + // Establecer el rango de direcciones DHCP
                      "default-router " + gateway + "\n" + // Establecer la puerta de enlace predeterminada
                      "exit"; // Salir del modo de configuración

    // Mostrar el comando generado al usuario
    alert("Comando DHCP generado:\n" + dhcpCommand);
}

function showRunningConfig() {
    // Simplemente mostrar un mensaje con el comando "show running-config"
    alert("Comando para mostrar la configuración actual:\nshow running-config");
}

function showInterfaceBrief() {
    // Simplemente mostrar un mensaje con el comando "show ip interface brief"
    alert("Comando para mostrar interfaces:\nshow ip interface brief");
}

function showVlanBrief() {
    // Simplemente mostrar un mensaje con el comando "show vlan brief"
    alert("Comando para mostrar VLANs:\nshow vlan brief");
}

function showDhcpBinding() {
    // Simplemente mostrar un mensaje con el comando "show ip dhcp binding"
    alert("Comando para mostrar asignaciones DHCP:\nshow ip dhcp binding");
}