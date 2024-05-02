from flask import request, Flask, jsonify
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

# Función para generar los comandos de configuración de dispositivos
def generate_commands(config_data):
    commands = []

    # Verificar qué configuraciones se desean realizar y generar los comandos correspondientes
    if 'hostname' in config_data:
        commands.append(f"hostname {config_data['hostname']}")
    if 'motd' in config_data:
        commands.append(f"banner motd {config_data['motd']}")
    if 'nat' in config_data:
        commands.append(f"ip nat inside source {config_data['nat']}")
    if 'route' in config_data:
        # Aquí debes definir cómo deseas manejar la configuración de rutas
        # commands.append(f"ip route {config_data['route']}")
        pass
    if 'poolName' in config_data and 'dhcpRange' in config_data and 'excludedIPs' in config_data:
        commands.append(f"ip dhcp pool {config_data['poolName']}")
        commands.append(f"network {config_data['dhcpRange']}")
        # Aquí podrías agregar la lógica para excluir direcciones IP estáticas
        # commands.append(f"ip dhcp excluded-address {config_data['excludedIPs']}")
        pass
    if 'gateway' in config_data:
        # commands.append(f"ip default-gateway {config_data['gateway']}")
        pass
    if 'dnsServers' in config_data:
        # commands.append(f"ip name-server {config_data['dnsServers']}")
        pass

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