import netmiko as nm
import json
import discover

router = {
    'device_type': 'cisco_ios',
    'ip': '10.10.69.1',
    'username': 'test',
    'password': 'test',
    'secret': 'test',
    'port': 22,
}

links = list()

conn = nm.ConnectHandler(**router)

a = conn.send_command('show cdp n d')
print(conn.host)
myIp = '10.10.69.1'
ips = discover.cdp_get_ips(a)
myInt = discover.cdp_get_interfaces(a)
nInts = discover.cdp_get_neighbour_inter(a)


for i in range(len(ips)):
    links.append({'from':myIp, 'to': ips[i], 't1': myInt[i], 't2': nInts[i]})


linksJS = json.dumps({'links':links})
print((linksJS))