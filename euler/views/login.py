import flask
import euler

@euler.app.route('/accounts/login/', methods=['GET'])
def show_login():
    if 'username' in flask.session and 'password' in flask.session:
        return flask.redirect(flask.url_for('show_index'))
    else:
        return flask.render_template('login.html')