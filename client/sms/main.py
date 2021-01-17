import sms
import sys

#-------------------------------------------------------------------------------

'''
Gets the phone number and message text from the command line.
'''
def get_arguments():
    if len(sys.argv) != 2:
        message = 'Expecting phone number and message as command line arguments'

        raise Exception(message)
    else:
        return sys.argv[1]

#-------------------------------------------------------------------------------

'''
Parses the command line arguments and sends an SMS message to a phone number.
'''
def main():
    exit_status = 0

    try:
        message = get_arguments()
        sms.send(message)
    except BaseException as error:
        print(str(error))
        exit_status = 1

    return exit_status

#-------------------------------------------------------------------------------

if __name__ == '__main__':
    sys.exit(main())
