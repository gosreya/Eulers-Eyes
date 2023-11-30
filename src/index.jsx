import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter, Routes, Route} from "react-router-dom" 
import App from './App'
import Login from './login'
import Teachers from './teachers'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)



