from flask import request, Flask, jsonify
from flask_cors import CORS
from ConexionTopologia import discover, device_configuration
from json import loads

server = Flask(__name__)
# Habilitar el manejo de solicitudes CORS para permitir solicitudes desde cualquier origen
CORS(server)

@server.route("/set-connection", methods=["POST"])
def query_and_discovery():
    conn = request.get_json()

    discover.create_conection(conn)

    return jsonify({"message": "Conexión establecida correctamente"}), 200

@server.route("/send-config", methods=["POST"])
def set_configuration():
    newConfig = request.get_json()
    print(newConfig)  # Imprimir los datos JSON en la consola del servidor

    device_configuration.send_configuration(newConfig)

    return jsonify({"message": "Configuración recibida correctamente"}), 200

if __name__ == "__main__":
    server.run(debug=True)
    