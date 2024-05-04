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


def get_device_info(conn):
    
    output = (conn.send_command("show processes cpu", use_textfsm=True))
    flash, ram = get_memory()
    interfaces = conn.send_command("show ip interface brief", use_textfsm=True)
    print(get_version)

def get_memory(conn):
    output = conn.send_command("show file system")
    a = [m.start() for m in finditer('\n', output)]
    lines = []
    start = 0
    for i in a:
        lines.append(output[start:i])
        start = i+1

    flash = lines[8].split()  
    ram = lines[9].split()
    
    flash_mem = {'size':flash[1], 'free':flash[2], 'used': str((int(flash[1])-int(flash[2])))}
    ram_mem   = {'size':ram[0], 'free':ram[1], 'used':str((int(ram[0])-int(ram[1])))}

    return flash_mem, ram_mem

def get_version(conn):
    output = conn.send_command('show version')
    line = output[:output.find('\n')]
    a = [m.start() for m in finditer(',', line)]

    brand = line[:4]
    model = line[line[a[0]]:line[a[1]]]
    version = line[line[a[1]]:line[a[2]]]

    return brand, model, version

try:
    conn = nm.ConnectHandler(**router)
except:
    print('No se pudo hacer la conexion')

#------------- marca
#------------- modelo
#------------- uso cpu 
#------------- uso memoria
#------------- version

if not conn.check_enable_mode():
    conn.enable()

try:
    output = conn.send_command('show version')
    line = output[:output.find('\n')]
    a = [m.start() for m in finditer(',', line)]

    brand = line[:5]
    model = line[a[0]+1:a[1]-1]
    version = line[a[1]+1:a[2]-1]
    print(brand.strip(), model.strip(), version.strip())
except:
    print('Fallo al mandar el mensaje')
