"""
WSGI config for the Inventory project.

This file exposes the WSGI callable as a module-level variable named ``application``.

WSGI (Web Server Gateway Interface) is a specification that serves as a standard for 
Python web application servers and applications to communicate.

For more information on this file, see:
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

# Set the default settings module for the 'inventory' project
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'inventory.settings')

# Create the WSGI application object that Django's built-in servers (and others) use
application = get_wsgi_application()
