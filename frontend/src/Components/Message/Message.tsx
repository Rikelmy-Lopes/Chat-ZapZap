import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import socketContext from '../../Context/SocketContext';
import { IContact, IMessage, IUser } from '../../Interface/Interfaces';
import MessageItem from '../MessageItem/MessageItem';
import './Message.css';

interface Props {
  selectedPhone: string;
  contacts: IContact[],
}

function Message({ selectedPhone, contacts }: Props): JSX.Element {
  const socket = useContext(socketContext);
  const [ messageInput, setMessageInput ] = useState<string>('');
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ hashRoomId, setHashRoomId ] = useState<string>('');

  const autoScroll = (): void => {
    const chatMessages: HTMLElement | null = document.getElementById('messages');
    if (!chatMessages) return;
    setTimeout(() => {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1);
  };

  const getNameOfChattingWith = (): string | undefined => {
    const contact: IContact | undefined = contacts.find((contact) => contact.phoneNumber === selectedPhone);
    return contact?.name;
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' && messageInput.length > 0) {
      sendMessageToUser();
      return;
    }
  };

  const addListenerToNewMessage = (): void => {
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

  const sendMessageToUser = (): void => {
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

  const getMessagesFromDatabase = async () => {
    const { token }: IUser = JSON.parse(String(localStorage.getItem('user')));
    const host = import.meta.env.VITE_BACKEND_HOST;
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

  const openNewChat = (): void => {
    if (!localStorage.getItem('user') || !selectedPhone) return;
    const { phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socket?.emit('new-chat', { toPhoneNumber: selectedPhone, fromPhoneNumber: phoneNumber });
    socket?.once('get-hashRoomId', (hash: string) => {
      setHashRoomId(hash);
    });
  };

  useEffect(() => {
    getMessagesFromDatabase();
  }, [hashRoomId]);

  useEffect(() => {
    deleteMessages();
    openNewChat();
    addListenerToNewMessage();
  }, [selectedPhone]);

  return(
    <div id='container-m'>
      <div id='message-container'>
        <h2>Conversando com: { getNameOfChattingWith() }</h2>
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
            onClick={ sendMessageToUser }
          >
          Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
