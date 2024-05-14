
var request = require('request');

var linkD= {
  "nodes": [
        {
            "key":"1",
            "type":"NAT"
        },
      {
          "key": "192.168.1.1",
          "type": "Router",
          "marca": "cisco",
          "model": "X86_64_LINUX_IOSD-UNIVERSALK9-M",
          "hostname": "RN1",
          "version": "17.6.6a",
          "int_ips": [
              {
                  "interface": "GigabitEthernet0/0/0",
                  "ip_address": "192.168.1.1",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet0/0/1",
                  "ip_address": "192.168.2.1",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet0/0/2",
                  "ip_address": "192.168.3.1",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet0/0/3",
                  "ip_address": "unassigned",
                  "status": "administratively down",
                  "proto": "down"
              }
          ],
          "cpu": "1",
          "flash": {
              "size": "33554432",
              "free": "33540044",
              "type": "nvram",
              "flags": "rw",
              "prefixes": "nvram:"
          },
          "ram": {
              "size": "1965010944",
              "free": "1870192640",
              "type": "disk",
              "flags": "ro",
              "prefixes": "webui:"
          }
      },
      {
          "key": "192.168.1.2",
          "type": "Switch",
          "marca": "cisco",
          "model": "C1000-UNIVERSALK9-M",
          "hostname": "S1",
          "version": "15.2(7)E6",
          "int_ips": [
              {
                  "interface": "Vlan1",
                  "ip_address": "192.168.1.2",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/1",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/2",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/3",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/4",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/5",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/6",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/7",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/8",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/9",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/10",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/11",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/12",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/13",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/14",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/15",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/16",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/17",
                  "ip_address": "unassigned",
                  "status": "up",
                  "proto": "up"
              },
              {
                  "interface": "GigabitEthernet1/0/18",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/19",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/20",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/21",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/22",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/23",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/24",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/25",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/26",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/27",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              },
              {
                  "interface": "GigabitEthernet1/0/28",
                  "ip_address": "unassigned",
                  "status": "down",
                  "proto": "down"
              }
          ],
          "cpu": "8",
          "flash": {
              "size": "524288",
              "free": "517361",
              "type": "nvram",
              "flags": "rw",
              "prefixes": "nvram:"
          },
          "ram": {}
      }
  ],
  "links": [
      {
          "from": "192.168.1.1",
          "to": "192.168.1.2",
          "t1": "GigabitEthernet0/0/0",
          "t2": "GigabitEthernet1/0/1"
      },
      {
          "from": "192.168.1.2",
          "to": "192.168.1.1",
          "t1": "GigabitEthernet1/0/1",
          "t2": "GigabitEthernet0/0/0"
      }
  ]
}


request({
    url:"http://localhost:3000/update-data",
    method: "POST",
    json: true,
    body: linkD,
}, function(error,response,body){console.log(response)}
);