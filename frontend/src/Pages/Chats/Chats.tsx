import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { IContact, IUser } from '../../Interface/Interfaces';
import './Chats.css';
import Message from '../Message/Message';

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

  const validateToken = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    const { token }: IUser = JSON.parse(String(localStorage.getItem('user'))) || {};
    try {
      await axios.post(`${host}/login/token`, {
        token
      });
      return;
    }
    catch(_error) {
      localStorage.removeItem('user');
      history('/login');
      return;
    }
  };

  useEffect((): void => {
    validateToken();
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