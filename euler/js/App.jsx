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
    
    const [question, setQuestion] = useState([]);
    const [allquestions, setAllQuestions] = useState({});
    // temp var for cycling through hardcoded integral questions
    let [tempCount, setTempCount] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    let [score, setScore] = useState(0);

    let mathCategories = {
        Algebra: ["Equations", "Polynomials"],
        Precalculus: ["Trigonometry", "Functions"],
        Calculus: ["Integrals", "Differentiation"]
    };

    const handleCategorySelect = (e) => {
        setCategory(e.target.value);
        setTopic("");
        setQuestion([]);

    };

    const handleTopicSelect = async (e) => {
        console.log("we topic got selected");
        setTopic(e.target.value);
        setTempCount(0);

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
                // console.log(JSON.stringify(data));
                // console.log(data["q"]);
                // console.log(data["q"]["q"]);
                // console.log(data["q"]["q"][0]);
                // console.log(data["q"]["q"][0]["question_text"]);
                setAllQuestions(data);
            }
            else {
                // Handle error, e.g., show an error message
                console.error('Error retrieving question:', response.status);
            }
        } catch (error) {
            console.error('Error retrieving question:', error.message);
        }
        // if (e.target.value === "Equations") {
        //     setQuestion([`\\frac{1}{5x} + 4 = 6`, `x = 10`]);
        // } else if (e.target.value === "Polynomials") {
        //     setQuestion([`-4x^2 + 7x + 2 = 0`, `x = \\frac{-1}{4}, x = 2`]);
        // } else if (e.target.value === "Trigonometry") {
        // } else if (e.target.value === "Functions") {
        // } else if (e.target.value === "Integrals") {
        //     setQuestion([`\\int_{a}^{b} x^2 \\, dx`, `\\frac{x^3}{3} + c`]);
        // } else if (e.target.value === "Differentiation") {
        //     setQuestion([`\\(\\frac{d}{dx} (2x^2 - 5)^4\\)`, `\\(16x(2x^2 - 5)^3\\)`]);
        // } else {
        //     // teacher Question Set 1
        //     setQuestion([`\\frac{d}{dx} (2x^2 - 5)^4`, `16x(2x^2 - 5)^3`]);
        // }

        setShowAnswer(false);
        console.log("topic came out okay");
    };

    const tempIntegralQuestions = [
        [`\\(\\int_{a}^{b} x\\sqrt{x} \\, dx\\)`, `\\frac{2}{5} + c\\`],
        [`\\int_{a}^{b} (3x^2 + 4x + 7) \\, dx\\`, `\\x^3 + 2x^2 + 7x + c\\`],
        [`\\int_{a}^{b} (x^3 + 6x^2 + 7) \\ dx\\`, `\\frac{x^4}{4} + 2x^3 + 7x + c\\`]
    ]
    const handleNewQuestion = () => {
        // setQuestion("New placeholder question for " + topic);
        // setQuestion(`\\int_{a}^{b} f(x) \\, dx^2`);
        // setQuestion(`\\sum_{n=1}^{\\infinity} 2^{-n} = 1`);
        if (tempCount < 3) {
            setQuestion(tempIntegralQuestions[tempCount]);
        } else {
            setQuestion([])
        }
        setTempCount(tempCount += 1);
        setShowAnswer(false);
    };


    const handleAnswer = () => {
        setShowAnswer(true);
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
                        <label
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
                    <div className="selection">
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
                                {allquestions && allquestions[category] && allquestions[category][topic] && allquestions[category][topic][0] && allquestions[category][topic][0]["question_text"] && ` ${allquestions[category][topic][0]["question_text"]}`}
                            </MathJax>
                            </MathJaxContext>
                        </div>
                        {showAnswer ? (
                            <div className="answer-box" tabIndex={0}>
                                Answer:&nbsp;
                                <MathJaxContext>
                                <MathJax>
                                {allquestions && allquestions[category] && allquestions[category][topic] && allquestions[category][topic][0] && allquestions[category][topic][0]["question_text"] && ` ${allquestions[category][topic][0]["question_answer"]}`}
                                </MathJax>
                                </MathJaxContext>
                            </div>
                        ) : (<button className="custom-button" onClick={handleAnswer} tabIndex={0}>Reveal Answer</button>)}

                        <div>
                            <button className="custom-button" onClick={handleNewQuestion} tabIndex={0}>Try Another Question</button>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
}

function TeacherApp() {
    return(
        <div className="app">
            <header className="header">
                    <h1 tabIndex={0}>EULER's EYES</h1>
                <h2 tabIndex={0}>Master Math with Interactive Practice</h2>  { }
            </header>
            <QuestionForm></QuestionForm>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <StudentForm></StudentForm>
        </div>
    )
}

export default App;