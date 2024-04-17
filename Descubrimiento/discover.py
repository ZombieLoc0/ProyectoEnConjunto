import netmiko as nm

def set_next_connection(host, user, password, device):
    conn = nm.ConnectHandler(
        _host = host,
        _username = user,
        _password = password,
        _decive_type = device
    )

    find_neighbours(conn)

def find_neighbours(conn):
    next_conn = None #La nueva conexion a otro vecino.

    _cdp = conn.send_command("show cdp neighbour")


    if(not find_neighbours(next_conn)):
        return False
    else:
        return True

devices = dict()

