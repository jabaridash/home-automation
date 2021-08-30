from wakeonlan import send_magic_packet

def wake_up(servers):
    '''
    Wakes each server up by sending it the magic packet.
    '''

    successes = []
    failures = []

    print(f'Will send magic packet to {len(servers)} server(s)')

    for server in servers:
        try:
            print(f'waking up {server.hostname} at mac address {server.mac}')
            send_magic_packet(server.mac)
            successes.append(server)
        except:
            print(f'Failed to wake up {server.hostname} at mac address {server.mac}')
            failures.append(server)

    return successes, failures
