import React from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Chats from './Pages/Chats/Chats';
import Register from './Pages/Register/Register';
import NewChat from './Pages/NewChat/NewChat';
import SocketProvider from './Context/SocketProvider';

function App() {
  return (
    <SocketProvider>
      <Routes>
        <Route element={ <Chats/> } path='/chats' />
        <Route element={ <Login/> } path='/login' />
        <Route element={ <Register/> } path='/register' />
        <Route element={ <NewChat/> } path='/new-chat' />
        <Route element={ <Login/> } path='/' />
      </Routes>
    </SocketProvider>
  );
}

export default App;
