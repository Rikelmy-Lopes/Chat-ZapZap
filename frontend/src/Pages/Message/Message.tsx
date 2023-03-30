import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './Message.css';
import { IContact, IMessage, IUser } from '../../Interface/Interfaces';
import axios from 'axios';

function Message({ selectedPhone }: any) {
  const socketRef = useRef<Socket>();
  const [ messageInput, setMessageInput ] = useState<string>('');
  const [ hashRoomId, setHashRoomId ] = useState<string>('');
  const [ messages, setMessages ] = useState<IMessage[]>([]);

  const autoScroll = (): void => {
    const chatMessages: HTMLElement | null = document.getElementById('messages');
    if (!chatMessages) return;
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1);
  };

  const getChatWithName = (): string | undefined => {
    const contacts = JSON.parse(String(localStorage.getItem('contacts'))) as IContact[];
    const contact: IContact | undefined = contacts.find((contact) => contact.phoneNumber === selectedPhone);
    return contact?.name;
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && messageInput.length > 0) {
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
      socketRef.current.on('message-receive', (message: IMessage) => {
        addMessage(message);
      });
    }
  };

  const addMessage = ({ userName, message, hour }: IMessage): void => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        userName,
        message,
        hour,
      }
    ]);
    autoScroll();
  };

  const deleteMessages = () => {
    setMessages([]);
  };

  const openChat = (): void => {
    if (!localStorage.getItem('user')) return;
    const { phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('chat', { phoneNumber1: selectedPhone, phoneNumber2: phoneNumber});
  };

  const sendMessage = (): void => {
    const { name, phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socketRef.current?.emit('message-send', { message: messageInput, hashRoomId, userName: name, phoneNumber });
    setMessageInput('');
  };

  const manageSocketConnection = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = undefined;
    }
    deleteMessages();
    createSocketConnection();
  };

  const getMessages = async () => {
    const { token }: IUser = JSON.parse(String(localStorage.getItem('user')));
    const host = process.env.REACT_APP_BACKEND_HOST;
    if (!hashRoomId) return;
    try {
      const { data } = await axios.get(`${host}/message`, {
        headers: {
          hashRoomId,
          Authorization: token
        }
      });
      setMessages(data);
      autoScroll();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, [hashRoomId]);

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
        <div 
          id='messages'
        > {
            messages.map(({userName, message, hour}, index) => {
              return (
                <div key={index} className="message">
                  <div className="name">{ userName }: </div>
                  <div className="content">
                    <div className="text"> { message }</div>
                    <div className="time">{ hour }</div>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div id='container-send-message'>
          <input
            placeholder='Digite sua mensagem'
            type="text" 
            value={ messageInput }
            onChange={({ target }) => setMessageInput(target.value)}
            onKeyDown={ handleKeyDown }
          />
          <button
            disabled={ !messageInput ? true : false}
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
