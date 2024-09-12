import netmiko as nm
from re import finditer


router = {
    'device_type': 'cisco_ios',
    'ip': '192.168.1.1',
    'username': 'gmedina',
    'password': 'cisco',
    'secret': 'cisco',
    'port': 22,
}

conn = nm.ConnectHandler(**router)

cp_use = (conn.send_command("show file system", use_textfsm=True))
print(cp_use)
