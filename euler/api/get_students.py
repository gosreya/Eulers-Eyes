import flask
import euler

@euler.app.route('/api/getstudents/')
def get_students():
    username = flask.session['username']
    connection = euler.model.get_db()
    
    # get the id of the teacher with username username
    cur = connection.execute(
        "SELECT teachers.id "
        "FROM teachers "
        "JOIN users on teachers.id = users.id "
        "WHERE users.username=?;",
        [username]
    )

    id = cur.fetchall()
    id = id[0]["id"]

    # get the username, fullname, num_attempt, num_correct of all students with teacher_id id
    cur = connection.execute(
        "SELECT users.username, students.name, students.num_attempt, students.num_correct "
        "FROM students "
        "JOIN users on students.id = users.id "
        "WHERE students.teacher_id=?;",
        [id]
    )

    all_students = cur.fetchall()

    to_ret = {}
    to_ret["students"] = all_students
    print(to_ret)
    return flask.jsonify(**to_ret), 200