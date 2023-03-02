import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Header from '../Components/Header/Header';

function Message() {
  const [ message, setMessage ] = useState<string>();
  const [ roomId, setRoomId ] = useState<string>(); 
  const { userPhone } = useParams();
  const socketRef = useRef<Socket>();
  const history = useNavigate();

  const createSocketConnection = () => {
    if (!socketRef.current && localStorage.getItem('token')) {
      socketRef.current = io('http://192.168.0.189:4000');
      openChat();
      socketRef.current.on('roomId', (roomId) => {
        setRoomId(roomId);
      });
      socketRef.current.on('message-receive', (message) => {
        addMessage(message);
      });
    }
  };

  const validateToken = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      await axios.post(`${host}/login/token`, {
        token: JSON.parse(String(localStorage.getItem('token')))
      });
      return;
    }
    catch(_error) {
      localStorage.removeItem('token');
      history('/login');
      return;
    }
  };

  const addMessage = (message: string) => {
    const divMessages = document.getElementById('messages') as HTMLElement;
    divMessages.innerHTML += `<p> ${ message } </p>`;
  };

  const openChat = () => {
    if (!localStorage.getItem('token')) return;
    socketRef.current?.emit('chat', { userPhone, token: JSON.parse(localStorage.getItem('token') as string )});
  };

  const sendMessage = () => {
    socketRef.current?.emit('message', { message, roomId });
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
        name="" 
        onChange={({ target }) => setMessage(target.value)}
      />
      <button
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
