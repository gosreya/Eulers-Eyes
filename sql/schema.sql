PRAGMA foreign_keys = ON;

CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        fullname TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
);

CREATE TABLE students (
        id INTEGER PRIMARY KEY,
        student_id TEXT UNIQUE,
        name TEXT,
        teacher_id INTEGER,
        num_attempt INTEGER DEFAULT 0,
        num_correct INTEGER DEFAULT 0,
        FOREIGN KEY (id) REFERENCES users (id),
        FOREIGN KEY (teacher_id) REFERENCES teachers (id)
);

CREATE TABLE teachers (
        id INTEGER PRIMARY KEY,
        teacher_id TEXT UNIQUE,
        name TEXT,
        FOREIGN KEY (id) REFERENCES users (id)
);

CREATE TABLE questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_owner INTEGER,
        question_text TEXT,
        question_answer TEXT,
        question_category TEXT,
        question_topic TEXT,
        FOREIGN KEY (question_owner) REFERENCES teachers (id)
);
