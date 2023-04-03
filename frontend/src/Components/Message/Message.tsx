import React, { useEffect, useState } from 'react';
import './Message.css';
import { IContact, IMessage, IUser } from '../../Interface/Interfaces';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import MessageItem from '../MessageItem/MessageItem';

interface Props {
  socket: Socket | undefined;
  selectedPhone: string;
  hashRoomId: string;
}

function Message({ socket, selectedPhone, hashRoomId }: Props): JSX.Element {
  const [ messageInput, setMessageInput ] = useState<string>('');
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
    socket?.removeAllListeners('new-message');
    socket?.on('new-message', (message: IMessage) => {
      addMessage(message);
    });
  };

  const addMessage = ({ userName, message, createdAt }: IMessage): void => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        userName,
        message,
        createdAt
      }
    ]);
    autoScroll();
  };

  const deleteMessages = () => {
    setMessages([]);
  };

  const sendMessage = (): void => {
    const { name, phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    const date = new Date();
    const timestamp = date.getTime();
    socket?.emit('new-message', { 
      message: messageInput, 
      userName: name,
      phoneNumber,
      hashRoomId,
      createdAt: String(timestamp)
    });
    // addMessage({ userName: name, message: messageInput, createdAt: hour });
    setMessageInput('');
  };

  const manageSocketConnection = () => {
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
  return(
    <div id='container-m'>
      <div id='message-container'>
        <h2>Conversando com: { getChatWithName() }</h2>
        <div 
          id='messages'
        > {
            messages.map(({ userName, message, createdAt }) => {
              return (
                <MessageItem
                  key={createdAt}
                  userName={ userName }
                  message={ message }
                  createdAt={ createdAt }
                />
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
