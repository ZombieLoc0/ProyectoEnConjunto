
var request = require('request');

var linkD= {
    "nodes": [
      { "key": "192.168.10.2", "type": "Router" },
      { "key": "192.168.10.3", "type": "Switch" },
      { "key": "192.168.10.4", "type": "Switch" }
    ],
    "links": [
      { "from": "192.168.10.2", "to": "192.168.10.3","t1":"G0/0","t2":"G0/0" },
      { "from": "192.168.10.3", "to": "192.168.10.2","t1":"G0/0","t2":"G0/0" },
      { "from": "192.168.10.3", "to": "192.168.10.4","t1":"G/0/1","t2":"G0/1"  },
      { "from": "192.168.10.4", "to": "192.168.10.2","t1":"G0/0/0","t2":"G0/2"  },
      { "from": "192.168.10.2", "to": "192.168.10.4","t1":"G0/1","t2":"G0/3"  }
    ]
}


request({
    url:"http://localhost:3000/update-data",
    method: "POST",
    json: true,
    body: linkD,
}, function(error,response,body){console.log(response)}
);