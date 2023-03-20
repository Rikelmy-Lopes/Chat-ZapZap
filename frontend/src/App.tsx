import React from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Chats from './Pages/Chats/Chats';
import Register from './Pages/Register/Register';
import Contacts from './Pages/Contacts/Contacts';

function App() {
  return (
    <Routes>
      <Route element={ <Chats/> } path='/chats' />
      <Route element={ <Login/> } path='/login' />
      <Route element={ <Register/> } path='/register' />
      <Route element={ <Contacts/> } path='/contacts' />
      <Route element={ <Login/> } path='/' />
    </Routes>
  );
}

export default App;
