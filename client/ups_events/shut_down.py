import time
import paramiko

def power_off_via_ssh(ip, user, password, port):
    command = 'sudo poweroff'
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ip, port, user, password)

    stdin, stdout, stderr = ssh.exec_command(command)
    lines = stdout.readlines()

    exit_status = stdout.channel.recv_exit_status()

    if exit_status is not 0:
        raise Exception(f'Shutting off {ip} exited with non-zero status: {exit_status}')

def shut_down(servers):
    '''
    Shuts each server down by logging in with ssh and running the poweroff command.
    '''

    successes = []
    failures = []

    seconds = 10
    print(f'Shutting down servers in {seconds} seconds')
    # time.sleep(seconds)
    # while [ $seconds -gt 0 ]; do
    #   echo -ne "$seconds\033[0K\r"
    #   sleep 1
    #   : $((seconds--))
    # done

    for server in servers:
        try:
            power_off_via_ssh(
                server.ip,
                server.user,
                server.password,
                server.ssh_port
            )

            successes.append(server)
        except:
            failures.append(server)

    return successes, failures
