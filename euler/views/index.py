import flask
import euler

@euler.app.route('/')
def show_index():
    if 'username' in flask.session and 'password' in flask.session:
        # do stuff
        connection = euler.model.get_db()
        logname = flask.session['username']

        # do the querying and processing

        context = {}
        return flask.render_template("index.html", **context)
    else:
        return flask.redirect(flask.url_for('show_login'))