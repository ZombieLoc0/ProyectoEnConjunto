from flask import request, Flask, jsonify
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

def generate_commands(config_data):
    commands = []

    if 'hostname' in config_data:
        commands.append("enable\nconfigure terminal\n" + f"hostname {config_data['hostname']}\nexit")
    if 'motd' in config_data:
        commands.append("enable\nconfigure terminal\n" + f"banner motd {config_data['motd']}\nexit")

    return commands


@server.route("/set-connection", methods=["POST"])
def query_and_discovery():
    conn = request.get_json()
    print(conn)
    return jsonify({"message": "Conexión establecida correctamente"}), 200

@server.route("/send-config", methods=["POST"])
def set_configuration():
    new_config = request.get_json()
    commands = generate_commands(new_config)
    print("Comandos de configuración generados:", commands)
    # Aquí deberías implementar la lógica para enviar los comandos a los dispositivos
    # Por ahora, simplemente los imprimimos en la consola del servidor
    return jsonify({"message": "Configuración recibida correctamente"}), 200

if __name__ == "__main__":
    server.run(debug=True)