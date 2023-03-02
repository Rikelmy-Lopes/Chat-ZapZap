import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { IContact, IUser } from '../Interface/Interfaces';

function Contacts() {
  const history = useNavigate();
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [contacts, setContacts] = useState<IContact[]>([]);

  const isContactExist = async (): Promise<boolean> => {
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      await axios.get(`${host}/user/${phoneNumber}`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const addContact = async (): Promise<void> => {
    if (await isContactExist()) {
      if (localStorage.getItem('contacts')) {
        const contacts: IContact[] = JSON.parse(String(localStorage.getItem('contacts')));
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
    }
  };

  const retrieveContacts = (): void => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
      return;
    }
    return;
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
          <Link
            id='contacts'  key={`${contact.phoneNumber}`} to={`/message/${contact.phoneNumber}`}>
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