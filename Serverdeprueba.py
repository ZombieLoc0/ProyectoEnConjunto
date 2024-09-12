
import socket
import json
import requests

HOST = '192.168.1.56'
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
        "Numero":"+523334707958",
        "Tiempo": t1,
        "Tipo": t2,
        "Descripcion": t3
    }
    print(f'Mandando: {json_obj}')
    #requests.post(url="http://localhost:3000/mensajes", json=json_obj, headers="")
    print("Mandado")
    return json_obj
    


#Con Af_Inet (Ipv4) y Sock_Dgram (Usar datagramas)

with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
    s.bind((HOST, PORT))
    print(f"{HOST} Listening on port {PORT}")

    #Bucle para siempre recibir
    while True:
        print("Escuchando: ")
        data, addr = s.recvfrom(1024)
        print("Recibido: ")
        json_string = json.dumps(parse_syslog_message(data))
        print(json_string)
        