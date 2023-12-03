import flask
import euler

@euler.app.route('/api/getquestions/')
def get_questions():
    to_ret = {}
    username = flask.session['username']

    # get the entire row from schema.sql (username is a student username)
    connection = euler.model.get_db()
    cur = connection.execute(
        "SELECT * "
        "FROM students "
        "JOIN users on students.id = users.id "
        "WHERE users.username=?;",
        [username]
    )

    first_query = cur.fetchall() # holds all student info

    # get the teacher id of the student described by the above query
    teacher_id = first_query[0]["teacher_id"]
    cur = connection.execute(
        "SELECT * "
        "FROM teachers "
        "WHERE id=?;",
        [teacher_id]
    )

    second_query = cur.fetchall() # holds all teacher info

    # get all the questions that this teacher has from the questions table
    cur = connection.execute(
        "SELECT * "
        "FROM questions "
        "WHERE question_owner=?;",
        [teacher_id]
    )

    all_questions = cur.fetchall() # holds all questions

    print(all_questions)

    # create a dictionary that maps question category to question topic to the items in all_questions
    # this is the dictionary that will be returned
    to_ret = {}
    for question in all_questions:
        if question["question_category"] not in to_ret:
            to_ret[question["question_category"]] = {}
        if question["question_topic"] not in to_ret[question["question_category"]]:
            to_ret[question["question_category"]][question["question_topic"]] = []
        to_ret[question["question_category"]][question["question_topic"]].append(question)

    return flask.jsonify(**to_ret), 200