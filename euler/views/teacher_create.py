import flask
from flask.helpers import url_for
import re
import random
from copy import deepcopy
import euler

@euler.app.route('/createquestion/', methods=['POST'])
def create_question():
    data = flask.request.get_json()
    username = flask.session['username']

    # assume we are logged in

    question_category = str(data.get('category'))
    question_topic = str(data.get('topic'))
    question_question = str(data.get('question'))
    question_answer = str(data.get('answer'))
    question_variables = data.get('variables', [])
    question_variations = str(data.get('variations'))
    print(question_variations)
    print(question_variables)
    
    # we have the question category, question topic, question variables for the question to be 

    to_add_to_db = []
    for i in range(0, int(question_variations)):
        curr_elt = []
        new_question = deepcopy(question_question)
        new_answer = deepcopy(question_answer)
        for variable in question_variables:
            var, min, max = variable.split()
            pattern_to_replace = "<" + var + ">"
            val = random.randint(int(min), int(max))
            val = str(val)
            new_question = re.sub(pattern_to_replace, val, new_question)
            new_answer = re.sub(pattern_to_replace, val, new_answer)
        curr_elt.append(new_question)
        new_answer = eval(new_answer)
        curr_elt.append(new_answer)
        to_add_to_db.append(curr_elt)
    
    connection = euler.model.get_db()

    cur = connection.execute(
        "SELECT teachers.id "
        "FROM teachers "
        "JOIN users on teachers.id = users.id "
        "WHERE users.username=?;",
        [username]
    )

    ans = cur.fetchall()

    ans = ans[0]["id"] # the teacher id

    for q in to_add_to_db:
        cur = connection.execute(
            "INSERT INTO questions(question_owner,question_text,question_answer,question_category,question_topic) "
            "VALUES(?,?,?,?,?);",
            [ans, q[0], q[1], question_category, question_topic]
        )
    
    # added all questions to the db
    return flask.redirect(flask.url_for('show_index'))

@euler.app.route('/addstudent/', methods=['POST'])
def add_student():
    data = flask.request.get_json()
    username = flask.session['username']
    student_fullname = str(data.get('studentName'))

    connection = euler.model.get_db()

    cur = connection.execute(
        "SELECT teachers.id "
        "FROM teachers "
        "JOIN users on teachers.id = users.id "
        "WHERE users.username=?;",
        [username]
    )

    teach = cur.fetchall()

    teach = teach[0]["id"] # the teacher id
    print(teach)
    print(data)

    # now, need to modify the student at fullname to point to this teacher

    cur = connection.execute(
        "UPDATE students "
        "SET teacher_id=? "
        "WHERE name=?;",
        [teach, student_fullname]
    )

    return flask.redirect(flask.url_for('show_index'))
