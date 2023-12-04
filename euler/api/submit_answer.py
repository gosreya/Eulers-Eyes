import flask
import euler

@euler.app.route('/api/submitAnswer/', methods=['POST'])
def submit_answer():
    """Submit an answer."""
    data = flask.request.get_json()
    username = flask.session['username']
    print(username)
    is_correct = data.get('isCorrect')
    if is_correct:
        is_correct = 1
    else:
        is_correct = 0

    connection = euler.model.get_db()

    cur = connection.execute(
        "SELECT id "
        "FROM users "
        "WHERE username=?;",
        [username]
    )
    id = cur.fetchall()
    id = id[0]["id"]

    cur = connection.execute(
        "UPDATE students SET num_attempt=num_attempt+1,num_correct=num_correct+? WHERE id=?;",
        [is_correct, id]
    )

    return flask.jsonify(**{}), 200