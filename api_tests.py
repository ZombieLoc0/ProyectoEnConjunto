import requests
import json

caca = {'ip':'10.10.69.1', 'username': 'test', 'password': 'test'}

commands = {'ip':'10.10.69.1','commands':"hostname Router1,ip domain name test.mx, int f0/0, ip add 10.10.69.19"}

#print(requests.post("http://127.0.0.1:5000/set-connection",json= json.dumps(caca)))

print(requests.post("http://127.0.0.1:5000/send-config",json= commands))