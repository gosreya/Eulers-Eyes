
import pathlib

# Root of this application, useful if it doesn't occupy an entire domain
APPLICATION_ROOT = '/'

# Secret key for encrypting cookies
SECRET_KEY = b'\xb8!\x04\xc0\xc0\x99\xc8\xf8\x19v\x01\x92&\x80\x04<c\xd1z\xa27:CE'
SESSION_COOKIE_NAME = 'login'

# File Upload to var/uploads/
EULER_ROOT = pathlib.Path(__file__).resolve().parent.parent

DATABASE_FILENAME = EULER_ROOT/'var'/'database.sqlite3'


