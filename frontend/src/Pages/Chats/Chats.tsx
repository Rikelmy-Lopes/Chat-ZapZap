import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { IContact, IUser } from '../../Interface/Interfaces';
import './Chats.css';
import Message from '../../Components/Message/Message';
import { validateToken  } from '../../Utils/Auth';
import { io, Socket } from 'socket.io-client';

function Chats(): JSX.Element {
  const history = useNavigate();
  const [socket, setSocket] = useState<Socket | undefined>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<undefined | string>(undefined);
  const [ hashRoomId, setHashRoomId ] = useState<string>('');

  const retrieveContacts = (): void => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
      return;
    }
    return;
  };
  
  const openChat = (): void => {
    if (!localStorage.getItem('user') || !selectedPhone) return;
    const { phoneNumber }: IUser = JSON.parse(String(localStorage.getItem('user')));
    socket?.emit('new-chat', { phoneNumber1: selectedPhone, phoneNumber2: phoneNumber, hashRoomId });
    socket?.once('get-hashRoomId', (hash: string) => {
      setHashRoomId(hash);
    });
  };
  useEffect(() => {
    openChat();
  }, [selectedPhone]);

  useEffect((): void => {
    validateToken(history);
    retrieveContacts();
    setSocket(io('http://192.168.0.189:4000'));
  }, []);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return(
    <div>
      <Header/>
      <div id='container'>
        <div id='contacts-section'>
          { contacts.map((contact) => (
            <button
              id='contact' 
              onClick={() => setSelectedPhone(contact.phoneNumber) } 
              key={`${contact.phoneNumber}`}
            >
              <span> Nome: <strong>{ contact.name }</strong> </span>
              <span> PhoneNumber: { contact.phoneNumber } </span>
            </button>
          ))
          }
        </div>
        <div id='messages-section'>
          {selectedPhone && <Message 
            selectedPhone={selectedPhone}
            socket={ socket }
            hashRoomId={ hashRoomId }
          />
          }
            
        </div>
      </div>
    </div>
  );
}

export default Chats;