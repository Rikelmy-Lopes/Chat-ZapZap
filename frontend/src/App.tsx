import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Pages/Contacts';
import Register from './Pages/Register';

function App() {
  return (
    <Routes>
      <Route element={<Contacts/>} path='/contacts' />
      <Route element={<Login/>} path='/login' />
      <Route element={<Login/>} path='/' />
      <Route element={<Register/>} path='/register' />
    </Routes>
  );
}

export default App;
