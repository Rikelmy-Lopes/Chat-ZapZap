import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { IContact, IUser } from '../../Interface/Interfaces';
import './Chats.css';
import Message from '../../Components/Message/Message';
import { validateToken  } from '../../Utils/Auth';
import { io, Socket } from 'socket.io-client';
import ContactItem from '../../Components/ContactItem/ContactItem';

function Chats(): JSX.Element {
  const history = useNavigate();
  const [socket, setSocket] = useState<Socket | undefined>();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<null | string>(null);

  const retrieveContacts = (): void => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
      return;
    }
    return;
  };

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
          {
            contacts.map((contact) => {
              return(
                <ContactItem
                  key={contact.phoneNumber}
                  contact={contact}
                  setSelectedPhone={ setSelectedPhone }
                />
              );
            })
          }
        </div>
        <div id='messages-section'>
          {selectedPhone && <Message 
            selectedPhone={selectedPhone}
            socket={ socket }
          />
          }
            
        </div>
      </div>
    </div>
  );
}

export default Chats;