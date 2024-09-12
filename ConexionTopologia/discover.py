import netmiko as nm
from re import finditer
from requests import post
from socket import gethostbyname, gethostname

#Discover Functions
def is_public(ip):
    _ip = ip[:ip.find('.')]
    private_ips = ['10','172','192']
    if _ip not in private_ips:
        return True
    return False

def find_cdp(conn):
    output = conn.send_command('show cdp neighbors detail', use_textfsm=True)
    nIps = list()
    for a in output:
        if a['management_ip'] != 'unassigned':
            print({'from':conn.host, 'to':a['management_ip'], 't1':a['local_port'], 't2':a['remote_port']})
            if is_public(a['management_ip']):
                links.append({'from':conn.host, 'to':'1', 't1':a['local_port'], 't2':a['remote_port']})
            else:
                links.append({'from':conn.host, 'to':a['management_ip'], 't1':a['local_port'], 't2':a['remote_port']})
            nIps.append(a['management_ip'])
    return nIps

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

    try:
        print(f'Estableciendo la conexión con el dispositivo: {sesion['ip']}...')
        visited_ips.append(sesion['ip'])
        key_hosts[sesion['ip']] = ''
        conn = nm.ConnectHandler(**sesion)
    except:
        print(f"No se pudo establecer la conexion {sesion['ip']}")
        return None
    nodes.append({'key':'1', 'type':'NAT'})
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
    print("\n--------------------------\n")

    #Query information form cdp neighbor
    try:
        neIps = find_cdp(conn)
    except:
        print("No tiene vecinos cdp")
        neIps = []

    #Query information from device
    int_brief = conn.send_command("show ip interface brief", use_textfsm = True)
    cpu = (conn.send_command("show processes cpu", use_textfsm=True))[0]['cpu_5_min']
    flash, ram = get_memory(conn)
    s_img, version, hostname = get_version(conn)

    #Prevents visiting the same device twice or more
    device_ips = list()
    
    for interface in int_brief:
        current_ip = interface['ip_address']
        if current_ip != 'unassigned':
            device_ips.append(current_ip)
        if current_ip not in visited_ips and current_ip != 'unassigned':
            visited_ips.append(current_ip)
    print(f'Ips de las interfaces: {device_ips}')

    print(f'Ips que no va a visitar: {visited_ips}')

    key_hosts[conn.host] = device_ips

    print(f'Key hosts y sus ips: {key_hosts}')
        
    nat = is_nat(conn)
    
    #Create nodes dictionary with ips and typeofdevice
    deviceType = get_device_type(conn.send_command("show version"))
    nodes.append({"key":conn.host, "type":deviceType, "nat":nat, "marca":'cisco', "model":s_img, "hostname": hostname, 
                  "version":version,"int_ips":int_brief, "cpu":cpu, "flash":flash, "ram":ram})
    
    set_syslog(conn)

    #Connects to other devices
    print("\n--------------------------\n")
    for i in neIps:
        if i not in visited_ips:
            set_next_connection(i)
    conn.disconnect()

#Query Info

def get_memory(conn):
    conn.enable()
    output = conn.send_command("show file system", use_textfsm = True)

    f = dict()
    r = dict()

    for d in output:
        if d['type'] == 'nvram':
            f = d
        elif d['type'] == 'disk':
            r = d

    return f,r

def get_version(conn):
        output = conn.send_command('show version', use_textfsm = True)
        
        s_img = output[0]['software_image']
        version = output[0]['version']
        hostname = output[0]['hostname']

        return s_img, version, hostname

#Extra functions

def get_key_host(host):
    for k in key_hosts.keys():
        for v in key_hosts[k]:
            if v == host:
                return k

def set_syslog(conn):
    try:
        conn.send_config_set(['logging 192.168.1.56', 'logging on', 'logging trap 4'])
    except:
        print('Error al establecer syslog')

def change_links():
    print(f'Key hosts: {key_hosts}')

    for link in links:
        link['to'] = get_key_host(link['to'])

    for i,d in enumerate(links):
        if d['to'] == '' or d['to'] == None:
            links.pop(i)

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

def is_nat(conn):
    nat = conn.send_command('show running-config | include ip nat')
    if nat is None:
        return None
    
    #get the interface
    a = [m.start() for m in finditer('interface', nat)]
    print(f'nat: {a}')
    if len(a) <= 0:
        return None

    inter = nat[a[0]:]
    inter = inter[:inter.find('\n')]
    inter.strip(' ')

    return inter[1]

key_hosts = dict()
sesion = dict()
visited_ips = []
host_info = dict()
nodes = list()
links = list()