from flask import Flask, request, jsonify
import socket
import json

app = Flask(__name__)

HOST = '192.168.1.9'
PORT = 514

@app.route('/sendPhoneNumber', methods=['POST'])
def send_phone_number():
    data = request.json
    phone_number = data.get('phoneNumber')

    # Enviar el número de teléfono al servidor syslog
    enviar_mensaje_syslog(phone_number)

    return jsonify({'message': 'Phone number received and sent to syslog server'}), 200

def enviar_mensaje_syslog(phone_number):
    # Crear el mensaje a enviar al servidor syslog
    message = f"El número de teléfono ingresado por el usuario es: {phone_number}"

    # Conectar con el servidor syslog y enviar el mensaje
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.sendto(message.encode(), (HOST, PORT))

if __name__ == '__main__':
    app.run(debug=True)
