import React, { useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
// import { Link, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css';  // Importing a CSS file to style the app
import QuestionForm from "./QuestionForm";
import StudentForm from "./StudentForm";
// import { MathComponent } from 'react-mathjax2'
// what the crap is this
function App() {
    const getCookieValue = () => {
        const myCookieValue = Cookies.get('role');
        return myCookieValue
    };

    const type = getCookieValue();

    console.log("type");
    console.log(type);

    if (type === "student") {
        return StudentApp();
    } else {
        return TeacherApp();
    }
}

function StudentApp() {
    const [category, setCategory] = useState("");
    const [topic, setTopic] = useState("");
    const [userAnswer, setUserAnswer] = useState("");

    const [allquestions, setAllQuestions] = useState({});
    // temp var for cycling through hardcoded integral questions
    let [tempCount, setTempCount] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    let mathCategories = {
        Algebra: ["Equations", "Polynomials"],
        Precalculus: ["Trigonometry", "Functions"],
        Calculus: ["Integrals", "Differentiation"]
    };

    const handleCategorySelect = (e) => {
        setCategory(e.target.value);
        setTempCount(0);
        setTopic("");

    };

    const handleTopicSelect = async (e) => {
        console.log("we topic got selected");
        setTopic(e.target.value);
        setTempCount(0);
        setUserAnswer("");

        // Perform GET request to the "/getquestions/" endpoint
        try {
            const response = await fetch('/api/getquestions/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success, e.g., redirect or show a success message
                console.log('Question retrieved successfully!');
                // console.log(response)
                const data = await response.json();
                console.log(data);
                setAllQuestions(data);
            }
            else {
                // Handle error, e.g., show an error message
                console.error('Error retrieving question:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving question:', error.message);
        }

        setShowAnswer(false);
        console.log("topic came out okay");
    };

    const tempIntegralQuestions = [
        [`\\(\\int_{a}^{b} x\\sqrt{x} \\, dx\\)`, `\\frac{2}{5} + c\\`],
        [`\\int_{a}^{b} (3x^2 + 4x + 7) \\, dx\\`, `\\x^3 + 2x^2 + 7x + c\\`],
        [`\\int_{a}^{b} (x^3 + 6x^2 + 7) \\ dx\\`, `\\frac{x^4}{4} + 2x^3 + 7x + c\\`]
    ]
    const handleNewQuestion = () => {
        setTempCount(tempCount += 1);
        setShowAnswer(false);
        setUserAnswer("");
    };


    // const handleAnswer = () => {
    //     setShowAnswer(true);
    // };

    const handleEnterKey = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            // Handle Enter key press
            e.preventDefault(); // Prevent default behavior of Enter key (e.g., form submission)
            console.log("heladlasdlkasdaskjhdakljhd")
            // Depending on the focused element, trigger the corresponding action
            if (document.activeElement.tagName === 'LABEL' || document.activeElement.tagName === 'BUTTON') {
                // If an input element is focused, trigger its onChange event
                document.activeElement.click();
            } else {
                // Trigger the action you want for other elements
                // For example, reveal answer when the Enter key is pressed
                handleAnswer();
            }
        }
    };

    const handleUserAnswerChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const handleUserAnswerSubmit = () => {
        // Compare the user's answer with the correct answer (you need to adjust this logic)
        console.log(userAnswer);
        console.log(allquestions[category][topic][tempCount]["question_answer"]);
        const isCorrect = userAnswer === allquestions[category][topic][tempCount]["question_answer"];

        // Show the correct answer
        setShowAnswer(true);

        // Make the post request to the DB with the data (username, isCorrect)
        // You need to replace 'username' with the actual username from your application
        const username = "username"; // Replace with the actual username
        const postData = {
            isCorrect: isCorrect,
        };

        // Perform POST request to the "/submitAnswer/" endpoint (you need to adjust the endpoint)
        fetch('/api/submitAnswer/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then(response => {
                if (response.ok) {
                    console.log('Answer submitted successfully!');
                } else {
                    console.error('Error submitting answer:', response.status);
                }
            })
            .catch(error => {
                console.error('Error submitting answer:', error.message);
            });

        // Show the button for the next question
        // You may want to reset the user's answer state here
    };


    return (
        <div className="app">
            <header className="header">
                    <h1 tabIndex={0}>EULER's EYES</h1>
                <h2 tabIndex={0}>Master Math with Interactive Practice</h2>  { }
            </header>

            <div className="container">

                <div className="selection">
                    <span tabIndex={0}>Category:</span>
                    {Object.keys(mathCategories).map((cat, index) => (
                        <label onKeyDown={handleEnterKey}
                            className={category === cat ? "custom-button-clicked" : "custom-button"}
                            key={index}
                            tabIndex={0}>
                            <input
                                type="radio"
                                value={cat}
                                checked={category === cat}
                                onChange={handleCategorySelect}
                                tabIndex={0}
                            />
                            {cat}
                        </label>
                    ))}
                </div>

                {category && (
                    <div className="selection" onKeyDown={handleEnterKey}>
                        <span tabIndex={0}>Topic:</span>
                        {mathCategories[category].map((t, index) => (
                            <label
                                className={topic === t ? "custom-button-clicked" : "custom-button"}
                                key={index}
                                tabIndex={0}>
                                <input
                                    type="radio"
                                    value={t}
                                    checked={topic === t}
                                    onChange={handleTopicSelect}
                                    tabIndex={0}
                                />
                                {t}
                            </label>
                        ))}
                    </div>
                )}

                {topic && (

                    <div className="content">
                        <div className="question-box" tabIndex={0}>
                            <MathJaxContext>
                            <MathJax>
                                {allquestions && allquestions[category] && allquestions[category][topic] && allquestions[category][topic][tempCount] && allquestions[category][topic][tempCount]["question_text"] && ` ${allquestions[category][topic][tempCount]["question_text"]}`}
                            </MathJax>
                            </MathJaxContext>
                        </div>
                        {showAnswer && (
                            <div className="answer-box" tabIndex={0}>
                                <MathJaxContext>
                                <MathJax>
                                    {allquestions && allquestions[category] && allquestions[category][topic] && allquestions[category][topic][tempCount] && allquestions[category][topic][tempCount]["question_answer"] && ` ${allquestions[category][topic][tempCount]["question_answer"]}`}
                                </MathJax>
                                </MathJaxContext>
                            </div>
                        )}
                        {
                            !showAnswer &&
                            (   
                                <label>
                                    Enter your answer:
                                    <br></br>
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={handleUserAnswerChange}
                                    placeholder="Enter your answer"
                                    tabIndex={0}
                                />
                                </label>
                            )
                        }
                        <div className="button-box">
                            {showAnswer && <button className="custom-button" onClick={handleNewQuestion} onKeyDown={handleEnterKey} tabIndex={0}>New Question</button>}
                            {!showAnswer && <button className="custom-button" onClick={handleUserAnswerSubmit} onKeyDown={handleEnterKey} tabIndex={0}>Answer</button>}
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
}

function TeacherApp() {
    const [modeStudents, setModeStudents] = useState(true);
    const [modeQuestions, setModeQuestions] = useState(false);

    return(
        <div className="app">
            <header className="header">
                <h1 tabIndex={0}>EULER's EYES</h1>
                <h2 tabIndex={0}>Master Math with Interactive Practice</h2>  { }
            </header>

            <div className="selection container">
                <span tabIndex={0}>Mode:</span>
                    <button
                        className={modeStudents ? "custom-button-clicked" : "custom-button"}
                        tabIndex={0}
                        onClick={() => {setModeStudents(true); setModeQuestions(false);}}>
                        Students
                    </button>
                    <button
                        className={modeQuestions ? "custom-button-clicked" : "custom-button"}
                        tabIndex={0}
                        onClick={() => {setModeStudents(false); setModeQuestions(true);}}>
                        Questions
                    </button>
            </div>

            <div>
                {modeQuestions ? <QuestionForm></QuestionForm> : <StudentForm></StudentForm>}
            </div>
        </div>
    )
}

export default App;