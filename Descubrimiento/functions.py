
from re import finditer


def get_ip(output):
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