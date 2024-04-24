import netmiko as nm
import functions


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

    n_ips = functions.cdp_get_ips(_cdp)
    n_inter = functions.cdp_get_interfaces(_cdp)
    n_neig_inter = functions.cdp_get_neighbour_inter(_cdp)

    cdp_info = {n_inter[i]: (n_ips[i], n_neig_inter[i]) for i in range(len(n_inter))}
    print(cdp_info)

    for i in n_ips:
        if i not in ips:
            set_next_connection(i)

def query_info(conn):
    #change
    _interfaces = conn.send_command("show ip int brief", user_textfsm=True)
    print(_interfaces)

ips = []
devices = dict()

set_next_connection('10.10.69.1')
print(devices)