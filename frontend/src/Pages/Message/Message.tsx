import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import './Message.css';

function Message() {
  const [ message, setMessage ] = useState<string>('');
  const [ hashRoomId, setHashRoomId ] = useState<string>(); 
  const { userPhone } = useParams();
  const socketRef = useRef<Socket>();
  const history = useNavigate();

  const autoScroll = () => {
    const chatMessages = document.getElementById('messages') as HTMLElement;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const getChatWithName = () => {
    const contacts = JSON.parse(String(localStorage.getItem('contacts'))) as any[];
    const contact = contacts.find((contact) => contact.phoneNumber === userPhone);
    return contact.name;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && message.length > 0) {
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
      socketRef.current.on('message-receive', ({ message, userName }) => {
        addMessage(message, userName);
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

  const addMessage = (message: string, userName: string) => {
    const divMessages = document.getElementById('messages') as HTMLElement;
    divMessages.innerHTML += `<span> <strong>${ userName }</strong>: ${ message } </span>`;
    autoScroll();
  };

  const openChat = () => {
    if (!localStorage.getItem('user')) return;
    const { phoneNumber } = JSON.parse(String(localStorage.getItem('user'))) || {};
    socketRef.current?.emit('chat', { phoneNumber1: userPhone, phoneNumber2: phoneNumber});
  };

  const sendMessage = () => {
    const { name } = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('message-send', { message, hashRoomId, userName: name });
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
      <h2>Conversando com: { getChatWithName() }</h2>
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
