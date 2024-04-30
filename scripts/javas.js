var request = require('request');

document.getElementById("loginForm").addEventListener("submit", function(event) {
        var ip = document.getElementById("ipInput").value;
        var username = document.getElementById("usernameInput").value;
        var password = document.getElementById("passwordInput").value;

        var myJSONObject = {
            'ip': ip,
            'username': username,
            'password': password
        };

        request({
            url: "http://localhost:5000/set-connection",
            method: "POST",
            json: true,
            body: myJSONObject
        }, function (error, response, body) {
            if (error) {
                console.error("Error en la solicitud:", error);
            } else {
                console.log("Respuesta del servidor:", response.body);
                window.location.href = "main.html";
            }
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