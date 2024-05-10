import requests
import socket
import json

HOST = '192.168.1.9'
PORT = 514

# Función para enviar mensajes usando la API de Twilio
def enviarMensajes(mensaje):
    # Código para enviar mensajes Twilio
    # Importa el módulo Twilio para interactuar con su API
    from twilio.rest import Client

    # Credenciales de autenticación de Twilio
    accountSid = 'AC197950e7e248ff96d25f214b519939f0' # Account SID
    authToken = 'b992c9a07521c87727fc84b3474c7142'     # Auth Token

    # Inicializa el cliente de Twilio con las credenciales proporcionadas
    client = Client(accountSid, authToken)

    # Utiliza el cliente de Twilio para enviar un mensaje SMS
    message = client.messages.create(
        body=mensaje,
        from_='+14015194259', # Número de teléfono desde el cual se enviará el mensaje (tu número de Twilio)
        to='+523334707958'    # Número de teléfono al cual se enviará el mensaje (el destinatario)
    )

    # Maneja la respuesta exitosa imprimiendo el SID del mensaje
    print("Mensaje enviado con SID:", message.sid)

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

    # Crear json, asignar partes a json
    json_obj = {
        "Tiempo": t1,
        "Tipo": t2,
        "Descripcion": t3
    }

    # Llamar a la función enviarMensajes dos veces
    enviarMensajes(json.dumps(json_obj))

    return json_obj
    
# Con AF_INET (IPv4) y SOCK_DGRAM (Usar datagramas)
with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print(f"{HOST} Listening on port {PORT}")

    # Bucle para siempre recibir
    while True:
        data, addr = s.recvfrom(1024)
        json_string = json.dumps(parse_syslog_message(data))
        print(json_string)
