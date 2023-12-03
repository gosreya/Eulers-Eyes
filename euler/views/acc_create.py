import flask
import euler


@euler.app.route('/accounts/create/', methods=['GET'])
def show_create():
    """Create page."""
    return flask.render_template('acc_create.html')
