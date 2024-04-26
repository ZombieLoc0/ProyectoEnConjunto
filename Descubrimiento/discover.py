import netmiko as nm
import functions
import os


def set_next_connection(ip):
    ips.append(ip)

    router = {
    'device_type': 'cisco_ios',
    'ip': ip,
    'username': 'test',
    'password': 'test',
    'secret': 'test',
    'port': 22,
    }

    try:
        conn = nm.ConnectHandler(**router)
        find_neighbours(conn)
    except:
        print("Conection Error")
    
def find_neighbours(conn):
    _cdp = conn.send_command("show cdp n d")

    #Query information form cdp neighbor
    n_ips = functions.cdp_get_ips(_cdp)
    n_inter = functions.cdp_get_interfaces(_cdp)
    n_neig_inter = functions.cdp_get_neighbour_inter(_cdp)
    
    #Query information from interface brief

    int_brief = conn.send_command("show ip interface brief", use_textfsm = True)
    print(int_brief[0]['interface'])

    #Prevents visiting the same device twice or more
    for interface in int_brief:
        if interface['ip_address'] not in ips:
            ips.append(interface['ip_address'])

    #Create a dictionary (key: device interface, values: neighbor ip and interface)
    cdp_info = {n_inter[i]: (int_brief[i]['ip_address'],n_neig_inter[i], n_ips[i]) for i in range(len(n_inter))}
    print(cdp_info)

    neighbor_connections.append(cdp_info)

    for i in n_ips:
        if i not in ips:
            set_next_connection(i)

ips = []
neighbor_connections = list()

set_next_connection('10.10.69.1')
#print(devices)