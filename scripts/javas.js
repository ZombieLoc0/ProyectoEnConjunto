function submitForm() {
    var ip = document.getElementById("ipInput").value;
    var username = document.getElementById("usernameInput").value;
    var password = document.getElementById("passwordInput").value;

    if (ip.trim() === '' || username.trim() === '' || password.trim() === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    var loader = document.getElementById("loader-wrapper");
    loader.style.display = "flex"; 

    var myJSONObject = {
        'ip': ip,
        'username': username,
        'password': password
    };

    fetch("http://localhost:5000/set-connection", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myJSONObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud:', response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);
        setTimeout(function() {
            window.location.href = "main.html"; // Redirige después de 5 segundos
        }, 5000);
    })
    .catch(error => {
        console.error("Error en la solicitud:", error.message);
        loader.style.display = "none"; // Ocultar el loader en caso de error
    });
}

function submitConfigForm() {
    var hostname = document.getElementById("hostnameInput").value;
    var motd = document.getElementById("motdInput").value;
    var nat = document.getElementById("natInput").value;
    var route = document.getElementById("routeInput").value;
    var poolName = document.getElementById("poolNameInput").value;
    var dhcpRange = document.getElementById("dhcpRangeInput").value;
    var excludedIPs = document.getElementById("excludedIPsInput").value;
    var gateway = document.getElementById("gatewayInput").value;
    var dnsServers = document.getElementById("dnsServersInput").value;

    var myJSONObject = {
        'hostname': hostname,
        'motd': motd,
        'nat': nat,
        'route': route,
        'poolName': poolName,
        'dhcpRange': dhcpRange,
        'excludedIPs': excludedIPs,
        'gateway': gateway,
        'dnsServers': dnsServers
    };

    fetch("http://localhost:5000/send-config", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myJSONObject)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud:', response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta del servidor:", data);
    })
    .catch(error => {
        console.error("Error en la solicitud:", error.message);
    });
}


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



/*var request = require('request');

var myJSONObject = {...};
request({
    url: "http://joshiahchoi.com/myjson",
    method: "POST",
    json: true,
    body: myJSONObject
    }, function (error, response, body{
        console.log(response);
});

from flask import request, Flask, jsonify
from json import loads
from ConexionTopologia import device_configuration, discover

server = Flask(__name__)

@server.route("/set-connection", methods=["POST"])
def query_and_discovery():
    conn = request.get_json()
    print(conn)

    discover.create_conection(loads(conn))

    return "Recibido", 201

@server.route("/send-config", methods=["POST"])
def set_configuration():
    newConfig = request.get_json()
    
    device_configuration.send_configuration(newConfig['ip'], newConfig['commands'])

    print(newConfig)

    return "Recibido", 201

if __name__ == "__main__":
    server.run(debug=True)

    
    
    import requests
    import json
    
    caca = {'ip':'10.10.69.1', 'username': 'test', 'password': 'test'}
    
    commands = {'ip':'10.10.69.1','commands':"hostname Router1,ip domain name test.mx, int f0/0, ip add 10.10.69.19"}
    
    print(requests.post("http://127.0.0.1:5000/set-connection",json= json.dumps(caca)))
    
    print(requests.post("http://127.0.0.1:5000/send-config",json= commands))
    */