from textfsm import TextFSM
import netmiko as nm

cdp_template = TextFSM(open("templates/cisco_ios_show_cdp_neighbors_detail.textfsm"))
int_brief_template = TextFSM(open("templates/cisco_ios_show_ip_interface_brief.textfsm"))

def parse_cdp(conn):
    cdp_res = ''
    cdp_res += conn.send_command("show cdp neighbor detail")
    cdp_parse = cdp_template.ParseText(cdp_res)
    return cdp_parse

def parse_int_brief(output):
    return(int_brief_template.ParseText(output))

router = {
    'device_type': 'cisco_ios',
    'ip': '10.10.69.1',
    'username': 'test',
    'password': 'test',
    'secret': 'test',
    'port': 22,
}

conn = nm.ConnectHandler(**router)

print(conn.send_command('show cdp neighbor description', use_textfsm=True))


