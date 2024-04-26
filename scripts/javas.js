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
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

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
    var excludedIP = document.getElementById("excludedIP").value; // Nueva línea para obtener la IP excluida

    var dhcpCommand = "configure terminal\n" + 
                      "no ip dhcp pool\n" + 
                      "ip dhcp pool " + poolName + "\n" + 
                      "network " + dhcpRange + " " + subnetMask + "\n" + 
                      "default-router " + gateway + "\n";
    if (excludedIP) {
        dhcpCommand += "exclude-address " + excludedIP + "\n"; // Agregar la IP excluida al comando DHCP si se proporciona
    }
    dhcpCommand += "exit"; 

    alert("Comando DHCP generado:\n" + dhcpCommand);
}

function applyBasicConf() {
    var poolName = document.getElementById("poolName").value;
    var dhcpRange = document.getElementById("dhcpRange").value;
    var subnetMask = document.getElementById("subnetMask").value;
    var gateway = document.getElementById("gateway").value;
    var excludedIP = document.getElementById("excludedIP").value; // Nueva línea para obtener la IP excluida

    var dhcpCommand = "configure terminal\n" + 
                      "no ip dhcp pool\n" + 
                      "ip dhcp pool " + poolName + "\n" + 
                      "network " + dhcpRange + " " + subnetMask + "\n" + 
                      "default-router " + gateway + "\n";
    if (excludedIP) {
        dhcpCommand += "exclude-address " + excludedIP + "\n"; // Agregar la IP excluida al comando DHCP si se proporciona
    }
    dhcpCommand += "exit"; 

    alert("Comando DHCP generado:\n" + dhcpCommand);
}