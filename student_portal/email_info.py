# For gmail and google apps
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST= 'smtp.gmail.com'
EMAIL_HOST_USER = 'hgatestacct@gmail.com'
EMAIL_HOST_PASSWORD = 'HirschGuitarAcademy2016'
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER