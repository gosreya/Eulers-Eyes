import React, { useState } from "react";
import MathJax from 'react-mathjax2';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './login';
import Teachers from './teachers';
import './App.css';  // Importing a CSS file to style the app
// import { MathComponent } from 'react-mathjax2'

function App() {
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  let [user, setUser] = useState(null);
  const [question, setQuestion] = useState([]);
  // temp var for cycling through hardcoded integral questions
  let [tempCount, setTempCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  let mathCategories = {
    Algebra: ["Equations", "Polynomials"],
    Precalculus: ["Trigonometry", "Functions"],
    Calculus: ["Integrals", "Differentiation"]
  };
  
  let getUser = (val = DEFAULT) => {
    setUser(val)
    if (user === 'student1'){
      mathCategories['Teacher Class'] = "Question Set 1"
    }
  };
  const handleCategorySelect = (e) => {
    setCategory(e.target.value);
    setTopic("");
    setQuestion([]);

  };

  const handleTopicSelect = (e) => {
    setTopic(e.target.value);
    setTempCount(0)
    if (e.target.value === "Equations") {
      setQuestion([`\\frac{1}{5x} + 4 = 6`, `x = 10`]);
    } else if (e.target.value === "Polynomials") {
      setQuestion([`-4x^2 + 7x + 2 = 0`, `x = \\frac{-1}{4}, x = 2`]);
    } else if (e.target.value === "Trigonometry") {
    } else if (e.target.value === "Functions") {
    } else if (e.target.value === "Integrals") {
      setQuestion([`\\int_{a}^{b} x^2 \\, dx`, `\\frac{x^3}{3} + c`]);
    } else if (e.target.value === "Differentiation") {
      setQuestion([`\\frac{d}{dx} (2x^2 - 5)^4`, `16x(2x^2 - 5)^3`]);
    } else {
      // teacher Question Set 1
      setQuestion([`\\frac{d}{dx} (2x^2 - 5)^4`, `16x(2x^2 - 5)^3`]);
    }
    setShowAnswer(false);
  };

  const tempIntegralQuestions = [
    [`\\int_{a}^{b} x\\sqrt{x} \\, dx`, `\\frac{2}{5} + c`],
    [`\\int_{a}^{b} (3x^2 + 4x + 7) \\, dx`, `x^3 + 2x^2 + 7x + c`],
    [`\\int_{a}^{b} (x^3 + 6x^2 + 7) \\ dx`, `\\frac{x^4}{4} + 2x^3 + 7x + c`]
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
        <Link to="/" style={{ textDecoration: 'none', color: 'white'
 }} >
          <h1 tabIndex="0">EULER's EYES</h1>
        </Link>
        <h2 tabIndex="0">Master Math with Interactive Practice</h2>  {}
      </header>

      <div className="container">
        <div>
          { user === null && (
              <Link to='/login'>
                <button style={{ position: 'fixed', right: 10 }}>Login</button>
              </Link>
          )}
        </div>
        {user !== 'teacher' && (
      <div>
        <Link to="/teachers">
          <button style={{ position: 'fixed', right: 10, top: 180 }}>Teacher Mode</button>
        </Link>
      </div>
        )}

        <div className="selection">
          <span tabIndex="0">Category:</span>
          {Object.keys(mathCategories).map((cat, index) => (
            <label
              className={category === cat ? "custom-button-clicked" : "custom-button"}
              key={index}
              tabIndex="0">
              <input
                type="radio"
                value={cat}
                checked={category === cat}
                onChange={handleCategorySelect}
                tabIndex="0"
              />
              {cat}
            </label>
          ))}
        </div>

        {category && (
          <div className="selection">
            <span tabIndex="0">Topic:</span>
            {mathCategories[category].map((t, index) => (
              <label
                className={topic === t ? "custom-button-clicked" : "custom-button"}
                key={index}
                tabIndex="0">
                <input
                  type="radio"
                  value={t}
                  checked={topic === t}
                  onChange={handleTopicSelect}
                  tabIndex="0"
                />
                {t}
              </label>
            ))}
          </div>
        )}

        {topic && (

          <div className="content">
            <div className="question-box" tabIndex="0">
              {/* {topic === "Integrals" && category === "Calculus" ? (
            <MathJax.Context input='tex'>
              <MathJax.Node>{question}</MathJax.Node>
            </MathJax.Context>
              ) : (
                question
              )} */}
              <MathJax.Context input='tex'>
                <MathJax.Node>{question[0]}</MathJax.Node>
              </MathJax.Context>
            </div>
            {showAnswer ? (
              <div className="answer-box" tabIndex="0">
                Answer:&nbsp;
                <MathJax.Context input='tex'>
                  <MathJax.Node>{question[1]}</MathJax.Node>
                </MathJax.Context>
              </div>
            ) : (
              <button className="custom-button" onClick={handleAnswer} tabIndex="0">Reveal Answer</button>
            )}

            <div>
              <button className="custom-button" onClick={handleNewQuestion} tabIndex="0">Try Another Question</button>
            </div>
          </div>
        )}
      </div>
    </div>


  );
}

export default App;
