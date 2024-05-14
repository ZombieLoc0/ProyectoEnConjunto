from flask import request, Flask, jsonify
from flask_cors import CORS
from ConexionTopologia import discover
from ConexionTopologia import device_configuration
from requests import post

server = Flask(__name__)
CORS(server)
sesion = dict()
device_ver_controller = dict()

@server.route("/set-connection", methods=["POST"])
def query_and_discovery():
    global sesion
    
    conn = request.get_json()
    sesion = {
        'device_type': 'cisco_ios',
        'ip': conn['ip'],
        'username': conn['username'],
        'password': conn['password'],
        'secret': conn['password'],
        'port': 22,
    }

    discover.create_conection(conn)

    return jsonify({"message": "Conexión establecida correctamente"}), 200

@server.route("/send-config", methods=["POST"])
def set_configuration():
    newConfig = request.get_json()
    print(newConfig)  # Imprimir los datos JSON en la consola del servidor

    sesion = {
        'device_type': 'cisco_ios',
        'ip': 'xd',
        'username': 'gmedina',
        'password': 'cisco',
        'secret': 'cisco',
        'port': 22,
    }

    sesion['ip'] = newConfig['ip']
    run_c = device_configuration.send_config(sesion, newConfig['command'])
    
    if run_c == None:
        return jsonify({"message": "Error al mandar configuracion"}), 400

    new_ver = {'key':sesion['ip'], 'newData':run_c}
    print(new_ver)

    post(url="http://127.0.0.1:3000/update-conf", json= new_ver)

    return jsonify({"message": "Configuración recibida correctamente"}), 200

if __name__ == "__main__":
    server.run(debug=True)
    