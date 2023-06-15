
import './App.css';
// import React, { component, useState } from 'react';
import { AuthProvider } from './components/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className='container'>
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col-lg-5">
          <AuthProvider>
            <Routes>
                <Route path="/profile" Component={Profile} />
                <Route path="/" Component={Login} />
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </div>
  )
}

export default App;
