"""
WSGI config for student_portal project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "student_portal.settings")

application = get_wsgi_application()


SECRET_KEY = 'tr4ocp+b=@q)sl3i8ri9f(*n#yf#tk3*n-b+_-tw^9u^0bbiv3'
AWS_STORAGE_BUCKET_NAME = 'hirschguitar'
AWS_ACCESS_KEY_ID = 'AKIAIVTWRJ5XEPGQRVZQ'
AWS_SECRET_ACCESS_KEY = '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'
