import json
from models import Server

with open('.config.json', 'r') as f:
    json_text = f.read()

dictionary = json.loads(json_text)

url = dictionary['url']
path = dictionary['path']
api_key = dictionary['api_key']

def get_server(values):
    return Server (
        ip=values['ip'],
        mac=values['mac'],
        hostname=values['hostname'],
        user=values['user'],
        password=values['password'],
        ssh_port=values['ssh_port']
    )

servers = list(map(get_server, dictionary['servers']))
