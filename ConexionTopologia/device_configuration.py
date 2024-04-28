import netmiko as nm

def create_commands_lists(commands_string):
    commands = commands_string.split(',')
    return commands

def send_configuration(ip, commands):

    myConn = {
        'device_type': 'cisco_ios',
        'ip': ip,
        'username': 'test',
        'password': 'test',
        'secret': 'test',
        'port': 22,
    }
    commands_lists = create_commands_lists(commands)

    try:
        conn = nm.ConnectHandler(**myConn)
    except:
        print(f"error al conectarse al dispositivo: {ip}")
    try:
        conn.send_config_set(commands_lists)
    except:
        print(f"error al mandar la configuracion")