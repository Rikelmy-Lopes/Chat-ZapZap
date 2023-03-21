import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { IContact } from '../../Interface/Interfaces';
import './Chats.css';
import Message from '../Message/Message';
import { validateToken  } from '../../Utils/Auth';

function Chats() {
  const history = useNavigate();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<undefined | string>(undefined);


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
  }, []);

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
          {selectedPhone && <Message selectedPhone={selectedPhone} />}
        </div>
      </div>
    </div>
  );
}

export default Chats;