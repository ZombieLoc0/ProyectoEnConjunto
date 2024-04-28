import netmiko as nm
from re import finditer

#Discover Functions

def cdp_get_ips(output):
    a = [m.start() for m in finditer('IP', output)]
    ips = []

    for i in range(0, len(a), 2):
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

#Connection Functions

def create_conection(connJson):
    ssh_info = {
        'device_type': 'cisco_ios',
        'ip': connJson['ip'],
        'username': connJson['username'],
        'password': connJson['password'],
        'secret': connJson['password'],
        'port': 22,
    }
    ips.append(ssh_info['ip'])

    try:
        conn = nm.ConnectHandler(**ssh_info)
        find_neighbours(conn)
    except:
        print(f"No se pudo establecer la conexion con {ssh_info['ip']}.")

    print(neighbor_connections)
    
def set_next_connection(ip):
    ips.append(ip)

    ssh_info['ip'] = ip

    try:
        conn = nm.ConnectHandler(**ssh_info)
        find_neighbours(conn)
    except:
        #Handle error
        print(f"2 No se pudo establecer la conexion con {ip}.")
    
def find_neighbours(conn):
    
    #Query information form cdp neighbor
    _cdp = conn.send_command("show cdp n d")
    neIps  = cdp_get_ips(_cdp)
    myInts = cdp_get_interfaces(_cdp)
    neInts = cdp_get_neighbour_inter(_cdp)
    
    #Query information from interface brief
    int_brief = conn.send_command("show ip interface brief", use_textfsm = True)
    print(int_brief[0]['interface'])
    
    #Prevents visiting the same device twice or more
    for interface in int_brief:
        if interface['ip_address'] not in ips:
            ips.append(interface['ip_address'])

    #Create a links dictionary of ips and interfaces from device to neighbor devices
    for i in range(len(ips)):
        neighbor_connections.append({'from':conn.host, 'to': neIps[i], 't1': myInts[i], 't2': neInts[i]})

    #Connects to other devices
    for i in neIps:
        if i not in ips:
            set_next_connection(i)

ssh_info = dict()
ips = []
neighbor_connections = list()

#create_conection({'ip':'10.10.69.1', 'username': 'test', 'password': 'test'})
#print(neighbor_connections)