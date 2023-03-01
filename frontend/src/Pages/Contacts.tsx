import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

function Contacts() {
  const history = useNavigate();
  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [contacts, setContacts] = useState<any[]>([]);

  const addContact = () => {
    if (localStorage.getItem('contacts')) {
      const contacts = JSON.parse(String(localStorage.getItem('contacts'))) as any[];
      contacts.push({
        name,
        phoneNumber,
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      setContacts(contacts);
    }
    else {
      localStorage.setItem('contacts', JSON.stringify([{ name, phoneNumber }]));
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
    }
  };

  const retrieveContacts = () => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
      return;
    }
    return;
  };

  const validateToken = async (): Promise<void> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      await axios.post(`${host}/login/token`, {
        token: JSON.parse(String(localStorage.getItem('token')))
      });
      return;
    }
    catch(_error) {
      localStorage.removeItem('token');
      history('/login');
      return;
    }
  };

  useEffect(() => {
    validateToken();
    retrieveContacts();
  }, []);

  return(
    <div>
      <Header/>
      <input
        placeholder='Nome'
        type="text" 
        name="" 
        onChange={ ({ target }) => setName(target.value) }
      />
      <input
        placeholder='Exemplo: +5538123456789'
        type="text" 
        name="" 
        onChange={ ({ target }) => setPhoneNumber(target.value) }
      />
      <button
        onClick={ addContact }
      >
          Adicionar Contato
      </button>
      <h3>Contatos</h3>
      <div id='contacts-container'>
        { contacts.map((contact) => (
          <Link id='contacts'  key={`${contact.phoneNumber}`} to={`/message/${contact.phoneNumber}`}>
            <span> Nome: <strong>{ contact.name }</strong> </span>
            <span> PhoneNumber: { contact.phoneNumber } </span>
          </Link>
        ))
        }
      </div>
    </div>
  );
}

export default Contacts;