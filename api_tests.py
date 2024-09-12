import requests
import json

device = [{'key':'10.10.69.1', 'type': 'Router'}, {'key':'10.10.69.2', 'type': 'Router'}]

links = [{'from':'10.10.69.1','to':"10.10.69.2", "t1":"g0/0","t2":"g0/1"}]

sendData = {"nodes": [
      { "key": "192.168.10.2", "type": "Router" },
      { "key": "192.168.10.3", "type": "Switch" },
      { "key": "192.168.10.4", "type": "Router" }
    ],
    "links": [
      { "from": "192.168.10.2", "to": "192.168.10.3","t1":"G0/0","t2":"G0/0" },
      { "from": "192.168.10.3", "to": "192.168.10.2","t1":"G0/0","t2":"G0/0" },
      { "from": "192.168.10.3", "to": "192.168.10.4","t1":"G/0/1","t2":"G0/1"  },
      { "from": "192.168.10.4", "to": "192.168.10.2","t1":"G0/0/0","t2":"G0/2"  },
      { "from": "192.168.10.2", "to": "192.168.10.4","t1":"G0/1","t2":"G0/3"  }
    ]
}

file = {'nodes':device,'links':links}
print(file)

print(requests.post("http://127.0.0.1:3000/update-data",json= sendData ))