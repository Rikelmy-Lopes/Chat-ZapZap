import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Header from '../Components/Header/Header';

function Message() {
  const [ message, setMessage ] = useState<string>();
  const [ hashRoomId, setHashRoomId ] = useState<string>(); 
  const { userPhone } = useParams();
  const socketRef = useRef<Socket>();
  const history = useNavigate();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
      return;
    }
  };

  const createSocketConnection = () => {
    if (!socketRef.current && localStorage.getItem('user')) {
      socketRef.current = io('http://192.168.0.189:4000');
      openChat();
      socketRef.current.on('roomId-send', (hash) => {
        setHashRoomId(hash);
      });
      socketRef.current.on('message-receive', (message) => {
        addMessage(message);
      });
    }
  };

  const validateToken = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    const { token } = JSON.parse(String(localStorage.getItem('user'))) || {};
    try {
      await axios.post(`${host}/login/token`, {
        token
      });
      return;
    }
    catch(error) {
      localStorage.removeItem('user');
      history('/login');
      return;
    }
  };

  const addMessage = (message: string) => {
    const divMessages = document.getElementById('messages') as HTMLElement;
    divMessages.innerHTML += `<p> ${ message } </p>`;
  };

  const openChat = () => {
    if (!localStorage.getItem('user')) return;
    const { phoneNumber } = JSON.parse(String(localStorage.getItem('user'))) || {};
    socketRef.current?.emit('chat', { phoneNumber1: userPhone, phoneNumber2: phoneNumber});
  };

  const sendMessage = () => {
    socketRef.current?.emit('message-send', { message, hashRoomId });
    setMessage('');
  };

  useEffect(() => {
    validateToken();
    createSocketConnection();
  }, []);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return(
    <div>
      <Header/>
      <h2>Conversando com: Name</h2>
      <input
        placeholder='Digite sua mensagem'
        type="text" 
        value={ message }
        onChange={({ target }) => setMessage(target.value)}
        onKeyDown={ handleKeyDown }
      />
      <button
        disabled={ !message ? true : false}
        onClick={ sendMessage }
      >
          Enviar
      </button>

      <div id='messages'>

      </div>
    </div>
  );
}

export default Message;
