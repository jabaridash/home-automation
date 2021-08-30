import sys

import config
from get_status import get_status
from notify import notify
from shut_down import shut_down
from wake_up import wake_up
from models import EVENTS, EVENT_ONBATTERY, EVENT_OFFBATTERY

#-------------------------------------------------------------------------------

def get_event():
    '''
    Gets the event name from the command line.
    '''

    event = None

    if len(sys.argv) != 2:
        raise Exception('Expecting event as command line argument')
    else:
        event = sys.argv[1]

        if event not in EVENTS:
            raise Exception(f'The event must be one of the following: {EVENTS}')

    return event

#-------------------------------------------------------------------------------

def handle():
    '''
    Executes the appropriate tasks depending on which type of event occured.
    '''

    event = get_event()

    # TODO - This should be failable. If we got onbattery/offbattery signal. Even
    # if we fail to get the UPS status, we should still do the appropriate shutdown
    # or wakeup sequence. We should wrap this in a try-except. Perhaps, the server
    # should not REQUIRE the status field. It should be optional, and the message
    # will only include a status if one was reported.
    status = get_status(event)

    if event == EVENT_ONBATTERY:
        successes, failures = shut_down(config.servers)
    elif event == EVENT_OFFBATTERY:
        successes, failures = wake_up(config.servers)
    else:
        raise Exception(f'Event not recognized: \'{event}\', must be on of the following {EVENTS}')

    notify(
        config.url,
        config.path,
        config.api_key,
        status,
        successes,
        failures
    )

#-------------------------------------------------------------------------------

def main():
    '''
    The main entry point to the program that processes the event.
    '''

    status_code = 0

    try:
        handle()
    except Exception as error:
        print(error)
        status_code = 1

    return status_code

#-------------------------------------------------------------------------------

if __name__ == '__main__':
    sys.exit(main())
