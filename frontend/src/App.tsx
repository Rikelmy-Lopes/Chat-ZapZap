import React from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Contacts from './Pages/Contacts';
import Register from './Pages/Register/Register';
import Message from './Pages/Message';

function App() {
  return (
    <Routes>
      <Route element={ <Message/> } path='/message/:userPhone' />
      <Route element={ <Contacts/> } path='/contacts' />
      <Route element={ <Login/> } path='/login' />
      <Route element={ <Register/> } path='/register' />
      <Route element={ <Login/> } path='/' />
    </Routes>
  );
}

export default App;
