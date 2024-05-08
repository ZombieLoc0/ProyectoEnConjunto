"""from flask import request, Flask, jsonify
#from flask_cors import CORS

server = Flask(__name__)"""

# Habilitar el manejo de solicitudes CORS para permitir solicitudes desde cualquier origen
#CORS(server)

"""@server.route("/set-connection", methods=["POST"])
def query_and_discovery():
    conn = request.get_json()
    print(conn) 
    return jsonify({"message": "Conexión establecida correctamente"}), 200

@server.route("/send-config", methods=["POST"])
def set_configuration():
    newConfig = request.get_json()
    print(newConfig)  # Imprimir los datos JSON en la consola del servidor
    return jsonify({"message": "Configuración recibida correctamente"}), 200

if __name__ == "__main__":
    server.run(debug=True)"""
import requests
import socket
import json

HOST = '192.168.1.6'
PORT = 514

def parse_syslog_message(data):
    # Decodificar el mensaje
    mensaje = data.decode("utf-8")

    # Encontrar delimitadores, guardarlos como variables
    delimitador1 = mensaje.find(':') + 22  
    delimitador2 = mensaje.find(':', delimitador1 + 1) + 1

    # Usar variables como delimitadores
    t1 = mensaje[:delimitador1]
    t2 = mensaje[delimitador1+2:delimitador2-1]
    t3 = mensaje[delimitador2+1:]

    #Crear json, asignar partes a json
    json_obj = {
    "Tiempo": t1,
    "Tipo": t2,
    "Descripcion": t3
    }
    requests.post(url="http://localhost:3000/mensajes", json=json_obj, headers="")
    return json_obj
    


#Con Af_Inet (Ipv4) y Sock_Dgram (Usar datagramas)

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print(f"{HOST} Listening on port {PORT}")

    #Bucle para siempre recibir
    while True:
        data, addr = s.recvfrom(1024)
        json_string = json.dumps(parse_syslog_message(data))
        print(json_string)
