import React from 'react';
import './App.css';
import Login from './Pages/Login';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Pages/Contacts';

function App() {
  return (
    <Routes>
      <Route element={<Contacts/>} path='/contacts' />
      <Route element={<Login/>} path='/login' />
      <Route element={<Login/>} path='/' />
    </Routes>
  );
}

export default App;
