from flask import request, Flask, jsonify
<<<<<<< Updated upstream
from flask_cors import CORS
=======
from json import loads
from ConexionTopologia import device_configuration, discover
>>>>>>> Stashed changes

server = Flask(__name__)

# Habilitar el manejo de solicitudes CORS para permitir solicitudes desde cualquier origen
CORS(server)

@server.route("/set-connection", methods=["POST"])
def query_and_discovery():
    conn = request.get_json()
<<<<<<< Updated upstream
    print(conn) 
    return jsonify({"message": "Conexión establecida correctamente"}), 200
=======
    print(conn)

    # Assuming 'discover.create_connection' function handles the connection establishment
    discover.create_connection(loads(conn))

    return "Connection established successfully", 201
>>>>>>> Stashed changes

@server.route("/send-config", methods=["POST"])
def set_configuration():
    newConfig = request.get_json()
<<<<<<< Updated upstream
    print(newConfig)  # Imprimir los datos JSON en la consola del servidor
    return jsonify({"message": "Configuración recibida correctamente"}), 200
=======
    
    # Assuming 'device_configuration.send_configuration' function sends configuration
    device_configuration.send_configuration(newConfig['ip'], newConfig['commands'])

    print(newConfig)

    return "Configuration sent successfully", 201
>>>>>>> Stashed changes

if __name__ == "__main__":
    server.run(debug=True)
