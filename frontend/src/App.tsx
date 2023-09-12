import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SocketProvider from './Context/SocketProvider';
import Chats from './Pages/Chats/Chats';
import Login from './Pages/Login/Login';
import NewChat from './Pages/NewChat/NewChat';
import Register from './Pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      <SocketProvider>
        <Routes>
          <Route element={ <Chats/> } path='/chats' />
          <Route element={ <Login/> } path='/login' />
          <Route element={ <Register/> } path='/register' />
          <Route element={ <NewChat/> } path='/new-chat' />
          <Route element={ <Login/> } path='/' />
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;