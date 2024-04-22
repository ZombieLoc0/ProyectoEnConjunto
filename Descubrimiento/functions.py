
from re import finditer
import netmiko as nm

def get_ips(output):
    a = [m.start() for m in finditer('IP', output)]
    ips = []
    for i in a:
        temp = output[i:-1]
        temp = temp[0:temp.find('\n')]
        temp = temp[12:]
        ips.append(temp)
    return ips

def get_interfaces(output):
    a = [m.start() for m in finditer('Interface', output)]
    ints = []
    for i in a:
        temp = output[i:-1]
        temp = temp[0:temp.find(',')]
        temp = temp[11:]
        ints.append(temp)
    
    return ints

def active_interfaces(output):
    #faltan cosas
    #get interface
    temp = output[output.find('\n'):]
    print(temp)
    interfaces = [m.start() for m in finditer('\n', temp)]
    lines = list()

    for i in range(len(interfaces)):
        lines.append(temp[interfaces[i+1] : interfaces[i-1]])


    print(lines)

    
    


router = {
    'device_type': 'cisco_ios',
    'ip': '10.10.69.1',
    'username': 'test',
    'password': 'test',
    'secret': 'test',
    'port': 22,
    }

conn = nm.ConnectHandler(**router)

intb = conn.send_command('show ip int brief')


active_interfaces(intb)
#print(intb)
