import pathlib
import uuid
import hashlib
import flask
from flask.helpers import url_for
import euler


@euler.app.route('/accounts/', methods=['POST'])
def account_work():
    """GET ACCOUNT EDIT REQS."""
    if flask.request.form['operation'] == 'login':
        return login()

    if flask.request.form['operation'] == 'create':
        return create()

    return flask.redirect(flask.request.args['target'])

def login():
    """Login func."""
    username = flask.request.form['username']
    password = flask.request.form['password']
    if username == '' or password == '':
        flask.session.clear()
        flask.abort(400)
        return flask.redirect(flask.url_for('show_login'))
    algorithm = 'sha512'
    salt = uuid.uuid4().hex
    connection = euler.model.get_db()
    # Query database
    cur = connection.execute(
        "SELECT username, password, role "
        "FROM users "
        "WHERE username=?",
        [username]
    )
    user = cur.fetchall()
    # print(user)
    if len(user) == 0:
        flask.session.clear()
        flask.abort(403)
        return flask.redirect(flask.url_for('show_login'))
    algorithm = 'sha512'
    salt = user[0]['password'][7:39]
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    password_db_string = "$".join([algorithm, salt, password_hash])
    print("hello there")
    print(password_db_string)
    print(user[0]['password'])
    if password_db_string == user[0]['password']:
        flask.session['username'] = username
        flask.session['password'] = password_db_string
        # flask.session['role'] = user[0]['role']
        resp = flask.make_response(flask.redirect(flask.url_for('show_index')))
        resp.set_cookie('role', user[0]['role'])
        # print("YEYE" + flask.request.args.get('target'))
        return resp
        # change this for future target urls
    flask.session.clear()
    flask.abort(403)
    return flask.redirect(flask.url_for('show_login'))


def create():
    """Create func."""
    fullname = flask.request.form['fullname']
    username = flask.request.form['email']
    password = flask.request.form['password']
    role = flask.request.form['role']
    if fullname and username and password and role:
        connection = euler.model.get_db()
        cur = connection.execute(
            "SELECT username "
            "FROM users "
            "WHERE username=?",
            [username]
        )
        user = cur.fetchall()
        if len(user) == 1:
            flask.session.clear()
            flask.abort(409)
            return flask.redirect(flask.url_for('show_create'))
        flask.session['username'] = username
        algorithm = 'sha512'
        salt = uuid.uuid4().hex
        hash_obj = hashlib.new('sha512')
        password_salted = salt + password
        hash_obj.update(password_salted.encode('utf-8'))
        password_hash = hash_obj.hexdigest()
        password_db_string = "$".join([algorithm, salt, password_hash])
        flask.session['password'] = password_db_string

        cur = connection.execute(
            "INSERT INTO users(username,fullname,password, role) "
            "VALUES(?, ?, ?, ?);",
            [username, fullname, password_db_string, role]
        )

        cur = connection.execute(
            "SELECT id FROM users "
            "WHERE username=?;",
            [username]
        )

        record = cur.fetchall()
        print(record)
        last_inserted_id = int(record[0]["id"])

        if role == 'teacher':
            cur = connection.execute(
                "INSERT INTO teachers(id,teacher_id,name) "
                "VALUES(?, ?, ?);",
                [last_inserted_id, username, fullname]
            )
        else:
            cur = connection.execute(
                "INSERT INTO students(id,student_id,name) "
                "VALUES(?, ?, ?);",
                [last_inserted_id, username, fullname]
            )
        return flask.redirect(flask.url_for('show_index'))
    flask.session.clear()
    flask.abort(400)
    return flask.redirect(flask.url_for('show_create'))