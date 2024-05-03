import netmiko as nm
import functions


def set_next_connection(ip):
    router = {
    'device_type': 'cisco_ios',
    'ip': ip,
    'username': 'gmedina',
    'password': 'cisco',
    'secret': 'cisco',
    'port': 22,
    }

    conn = nm.ConnectHandler(**router)

    find_neighbours(conn)

def find_neighbours(conn):
    _cdp = conn.send_command("show cdp n d")

    n_ips = functions.get_ips(_cdp)
    n_inter = functions.get_interfaces(_cdp)

    for i in n_ips:
        if i not in ips:
            ips.append(i)
            set_next_connection(i)

def query_info(conn):
    _interfaces = conn.send_command("show ip int brief")
    n_interfaces = functions.get_interfaces(_interfaces)

ips = []
current_device = 0
devices = dict()

set_next_connection('192.168.10.1')

print(ips)

#print(devices)