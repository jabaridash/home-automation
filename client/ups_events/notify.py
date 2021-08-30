import http.client
import json
import pprint

#-------------------------------------------------------------------------------

def get_server_details(server):
    return {
        'ip': server.ip,
        'hostname': server.hostname,
        'mac': server.mac
    }

#-------------------------------------------------------------------------------

def notify(url, path, api_key, status, successes, failures):
    '''
    Sends the status of the UPS to the server.
    '''

    conn = http.client.HTTPSConnection(url)

    headers = {
      'x-api-key': api_key,
      'Content-Type': 'application/json'
    }

    status['successes'] = list(map(get_server_details, successes))
    status['failures'] = list(map(get_server_details, failures))

    pretty_printer = pprint.PrettyPrinter(indent=2)
    pretty_printer.pprint(status)

    conn.request("POST", path, json.dumps(status), headers)
    res = conn.getresponse()
    data = res.read()
