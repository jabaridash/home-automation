import os

def get_status(event):
    '''
    Gets the status from the UPS by running apcaccess, parses the output,
    and returns it in a more JSON-friendly (dictionary) format.
    '''

    status = {}
    output = os.popen('apcaccess').read()
    lines = output.split('\n')
    lines.pop() # Remove the extra empty line

    for line in lines:
        colon_index = line.index(':')
        key = line[:colon_index].strip().lower()
        value = line[colon_index + 2:]
        status[key] = value

    payload = {
        "type": event,
        "status": status
    }

    return payload
