import netmiko as nm

def create_commands_lists(commands_string):
    commands = commands_string.split(',')
    return commands

def send_config(sesion, commands):
    comm_lists = create_commands_lists(commands)

    try:
        conn = nm.ConnectHandler(**sesion)
    except:
        print('No se pudo establecer la conexion')
        return None
    try:      
        conn.send_config_set(comm_lists)
    except:
        print('Error a mandar la configuracion')
        return None

    try:
        run = conn.send_command('show run')
    except:
        print(f'Error al mostrar running config')
        return None
    
    version = 'version'

    if sesion['ip'] in device_ver_control:
        device_ver_control[sesion['ip']] += 1
    else:
        device_ver_control[sesion['ip']] = 1
    
    version += str(device_ver_control[sesion['ip']])

    return {version:run}

device_ver_control = dict()