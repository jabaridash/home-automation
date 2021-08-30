EVENT_ONBATTERY = 'onbattery'
EVENT_OFFBATTERY = 'offbattery'

EVENTS = [
    EVENT_ONBATTERY,
    EVENT_OFFBATTERY
]

class Server:
    def __init__(self, ip, mac, hostname, user, password, ssh_port):
        self.ip = ip
        self.mac = mac
        self.hostname = hostname
        self.user = user
        self.password = password
        self.ssh_port = ssh_port
