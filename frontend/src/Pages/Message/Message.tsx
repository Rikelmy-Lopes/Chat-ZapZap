import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import './Message.css';
import { IContact, IMessageReceive, IUser } from '../../Interface/Interfaces';

function Message() {
  const history = useNavigate();
  const socketRef = useRef<Socket>();
  const { userPhone } = useParams();
  const [ message, setMessage ] = useState<string>('');
  const [ hashRoomId, setHashRoomId ] = useState<string>(''); 

  const autoScroll = (): void => {
    const chatMessages: HTMLElement | null = document.getElementById('messages');
    if (!chatMessages) return;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const getChatWithName = (): string | undefined => {
    const contacts = JSON.parse(String(localStorage.getItem('contacts'))) as IContact[];
    const contact: IContact | undefined = contacts.find((contact) => contact.phoneNumber === userPhone);
    return contact?.name;
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && message.length > 0) {
      sendMessage();
      return;
    }
  };

  const createSocketConnection = (): void => {
    if (!socketRef.current && localStorage.getItem('user')) {
      socketRef.current = io('http://192.168.0.189:4000');
      openChat();
      socketRef.current.on('roomId-send', (hash: string) => {
        setHashRoomId(hash);
      });
      socketRef.current.on('message-receive', ({ message, userName }: IMessageReceive) => {
        addMessage(message, userName);
      });
    }
  };

  const validateToken = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    const { token }: IUser = JSON.parse(String(localStorage.getItem('user')));
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

  const addMessage = (message: string, userName: string): void => {
    const divMessages: HTMLElement | null  = document.getElementById('messages');
    if (!divMessages) return;
    divMessages.innerHTML += `<span> <strong>${ userName }</strong>: ${ message } </span>`;
    autoScroll();
  };

  const openChat = (): void => {
    if (!localStorage.getItem('user')) return;
    const { phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('chat', { phoneNumber1: userPhone, phoneNumber2: phoneNumber});
  };

  const sendMessage = (): void => {
    const { name }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('message-send', { message, hashRoomId, userName: name });
    setMessage('');
  };

  useEffect((): void => {
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
