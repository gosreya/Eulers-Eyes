import React, { useState } from "react";
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import App from './App.jsx';
import './App.css';

function Login(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();

    // Basic validation (you might want to improve this)
    if (username === 'teacher' && password === 'password') {
      setIsLoggedIn(true);
      props.sendUser(username);
      navigate('/');
    } else if (username === 'student1' && password === 'password') {
      setIsLoggedIn(true)
      props.sendUser(username);
      navigate('');
    } else if (username === 'student2' && password === 'password') {
        setIsLoggedIn(true)
        props.sendUser(username);
        navigate('');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <header className="header">
        <a href="/" style={{ textDecoration: 'none', color: 'white'
           }}>
          <h1 tabIndex="0">EULER's EYES</h1>
        </a>
        <h2 tabIndex="0">Master Math with Interactive Practice</h2>  {}
      </header>
      
      <div className="container">
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  )
}

export default Login;