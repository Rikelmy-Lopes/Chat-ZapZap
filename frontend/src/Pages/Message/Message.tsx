import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './Message.css';
import { IContact, IMessageReceive, IUser } from '../../Interface/Interfaces';

function Message({ selectedPhone }: any) {
  const socketRef = useRef<Socket>();
  const [ message, setMessage ] = useState<string>('');
  const [ hashRoomId, setHashRoomId ] = useState<string>('');
  const [ messages, setMessages ] = useState([]);

  const autoScroll = (): void => {
    const chatMessages: HTMLElement | null = document.getElementById('messages');
    if (!chatMessages) return;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const getChatWithName = (): string | undefined => {
    const contacts = JSON.parse(String(localStorage.getItem('contacts'))) as IContact[];
    const contact: IContact | undefined = contacts.find((contact) => contact.phoneNumber === selectedPhone);
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
      socketRef.current.on('message-receive', ({ message, userName, hour }: IMessageReceive) => {
        addMessage(message, userName, hour);
      });
    }
  };

  const addMessage = (message: string, userName: string, hour: string): void => {
    const divMessages: HTMLElement | null  = document.getElementById('messages');
    if (!divMessages) return;
    divMessages.innerHTML += `
    <div class="message">
    <div class="name">${ userName }:</div>
    <div class="content">
        <div class="text">${ message }</div>
        <div class="time">${ hour }</div>
    </div>
  </div>`;
    autoScroll();
  };

  const deleteMessages = () => {
    const messagesDiv = document.getElementById('messages') as HTMLElement;
    messagesDiv.innerHTML = '';
  };

  const openChat = (): void => {
    if (!localStorage.getItem('user')) return;
    const { phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('chat', { phoneNumber1: selectedPhone, phoneNumber2: phoneNumber});
  };

  const sendMessage = (): void => {
    const { name, phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('message-send', { message, hashRoomId, userName: name, phoneNumber });
    setMessage('');
  };

  const manageSocketConnection = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = undefined;
    }
    deleteMessages();
    createSocketConnection();
  };

  useEffect(() => {
    manageSocketConnection();
  }, [selectedPhone]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return(
    <div id='container-m'>
      <div id='message-container'>
        <h2>Conversando com: { getChatWithName() }</h2>
        <div id='messages'> </div>
        <div id='container-send-message'>
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
        </div>
      </div>
    </div>
  );
}

export default Message;
