import React, { useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import App from './App.jsx';
import './App.css';

function Teachers(props){
  let classQuestions = {}
  const teacherActions = ['Add Class', 'Edit Questions']
  return (
   <div className='app'>
     <header className="header">
       <a href="/" style={{ textDecoration: 'none', color: 'white'
          }}>
         <h1 tabIndex="0">EULER's EYES</h1>
       </a>
       <h2 tabIndex="0">Master Math with Interactive Practice</h2>  {}
     </header>

     <div className='container'>
       <div>
         <div className="selection">
           {/* {teacherActions.map((t, index) => (
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
           ))} */}
         </div>
       </div>
       <div>
         <span tabIndex="0">Classes:</span>
         
       </div>
     </div>
     
   </div>
  )
}

export default Teachers;