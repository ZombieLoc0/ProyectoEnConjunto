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