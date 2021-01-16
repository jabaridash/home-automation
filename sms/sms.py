
# from os import environ

import os, sys
import configparser
from twilio.rest import Client

#-------------------------------------------------------------------------------

def path_for(properties):
    pathname = os.path.dirname(sys.argv[0])
    full_path = os.path.abspath(pathname)

    return "{}/{}".format(full_path, properties)

#-------------------------------------------------------------------------------

'''
Sends SMS message using Twilio API.
'''
def send(message):
    config_path = path_for('twilio.properties')

    config = configparser.ConfigParser()
    config.read(config_path)

    account_sid = config.get('twilio', 'account_sid')
    auth_token = config.get('twilio', 'auth_token')
    _from = config.get('twilio', 'phone_number')
    _to = config.get('admin', 'phone_number')

    client = Client(account_sid, auth_token)

    client.messages.create(
        body=message,
        from_=_from,
        to=_to
    )
