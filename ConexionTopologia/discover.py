import netmiko as nm
from re import finditer
from json import dumps
from requests import post

#Discover Functions

def cdp_get_ips(output):
    a = [m.start() for m in finditer('IP', output)]
    ips = []

    for i in range(0, len(a)):
        temp = output[a[i]:-1]
        temp = temp[0:temp.find('\n')]
        temp = temp[12:]
        ips.append(temp)

    return ips

def cdp_get_interfaces(output):
    a = [m.start() for m in finditer('Interface', output)]
    ints = []
    for i in a:
        temp = output[i:-1]
        temp = temp[0:temp.find(',')]
        temp = temp[11:]
        ints.append(temp)
    
    return ints

def cdp_get_neighbour_inter(output):
    a = [m.start() for m in finditer('Port', output)]
    ints = []
    for i in a:
        temp = output[i:-1]
        temp = temp[:temp.find('\n')]
        temp = temp[temp.find(':'):]
        temp = temp[2:]
        ints.append(temp)
    
    return ints

def get_device_type(output):
    a = [m.start() for m in finditer('Switch', output)]
    
    if a:
        return 'Switch'
    else:
        return 'Router'


#Connection Functions

def create_conection(connJson):
    global sesion
    sesion = {
        'device_type': 'cisco_ios',
        'ip': connJson['ip'],
        'username': connJson['username'],
        'password': connJson['password'],
        'secret': connJson['password'],
        'port': 22,
    }
    
    visited_ips.append(sesion['ip'])
    key_hosts[sesion['ip']] = ''

    try:
        print(f'Estableciendo la conexión con el dispositivo: {sesion['ip']}...')
        conn = nm.ConnectHandler(**sesion)
    except:
        print(f"No se pudo establecer la conexion {sesion['ip']}")
        return None

    find_neighbours(conn)
    #print(f'Información final:\nIps Totales: {ips}\nNodos: {nodes}\nLinks: {links}')
    change_links()
    post(url="http://127.0.0.1:3000/update-data", json={"nodes":nodes, "links": links})
    restart_variables()

    
def set_next_connection(ip):
    visited_ips.append(ip)
    key_hosts[ip] = ''
    sesion['ip'] = ip

    try:
        print(f'Estableciendo la conexión con el dispositivo: {sesion['ip']}...')
        conn = nm.ConnectHandler(**sesion)
    except:
        #Handle error
        print(f"2 No se pudo establecer la conexion con {ip}.")
        return None
    
    find_neighbours(conn)
    
def find_neighbours(conn):
    #Query information form cdp neighbor
    _cdp = conn.send_command("show cdp n d")
    neIps  = cdp_get_ips(_cdp)
    myInts = cdp_get_interfaces(_cdp)
    neInts = cdp_get_neighbour_inter(_cdp)
    print(f'Información CDP:\nIps: {neIps}\nDe: {myInts}\nA: {neInts}\n')

    #Query information from interface brief
    int_brief = conn.send_command("show ip interface brief", use_textfsm = True)
    
    #Prevents visiting the same device twice or more
    device_ips = list()

    for interface in int_brief:
        current_ip = interface['ip_address']
        if current_ip != 'unassigned':
            device_ips.append(current_ip)
        if current_ip not in neIps and current_ip not in visited_ips :
            visited_ips.append(current_ip)
    print(f'Ips de las interfaces: {device_ips}')
    key_hosts[conn.host] = device_ips

    #Create a links dictionary of ips and interfaces from device to neighbor devices
    for i in range(len(neIps)-1):
        
        try:
            links.append({'from':conn.host, 'to': neIps[i], 't1': myInts[i], 't2': neInts[i]})
        except:
            break

    #Create nodes dictionary with ips and typeofdevice
    deviceType = get_device_type(conn.send_command("show version"))
    nodes.append({"key":conn.host, "type":deviceType})

    #Connects to other devices
    for i in neIps:
        if i not in visited_ips:
            set_next_connection(i)

def get_key_host(host):
    for k in key_hosts.keys():
        for v in key_hosts[k]:
            if v == host:
                return k

#Extra functions

def change_links():
    for link in links:
        print(link)
        link['to'] = get_key_host(link['to'])

def restart_variables():
    global key_hosts
    global sesion
    global visited_ips
    global host_info
    global nodes
    global links

    key_hosts = dict()
    sesion = dict()
    visited_ips = []
    host_info = dict()
    nodes = list()
    links = list()


key_hosts = dict()
sesion = dict()
visited_ips = []
host_info = dict()
nodes = list()
links = list()

#create_conection({'ip':'10.10.69.1', 'username': 'test', 'password': 'test'})
#print(neighbor_connections)