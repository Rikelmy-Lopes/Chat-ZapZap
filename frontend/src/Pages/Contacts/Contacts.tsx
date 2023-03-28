import React, { useEffect, useState } from 'react';
import { IContact } from '../../Interface/Interfaces';
import axios from 'axios';
import './Contacts.css';
import Header from '../../Components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { validateToken  } from '../../Utils/Auth';

function Contacts() {
  const history = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [contacts, setContacts] = useState<IContact[]>([]);

  const getContactInfo = async (): Promise<void> => {
    if (isContactAlreadySaved()) return;
    const host = process.env.REACT_APP_BACKEND_HOST;
    try {
      const { data } = await axios.get(`${host}/user/${phoneNumber}`);
      addContact(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const isContactAlreadySaved = (): boolean => {
    const contacts: IContact[] = JSON.parse(String(localStorage.getItem('contacts'))) || [];
    return contacts.some((contact) => contact.phoneNumber === phoneNumber);
  };

  const addContact = async (userName: string): Promise<void> => {
    if (localStorage.getItem('contacts')) {
      const contacts: IContact[] = JSON.parse(String(localStorage.getItem('contacts')));
      contacts.push({
        name: userName,
        phoneNumber,
      });
      localStorage.setItem('contacts', JSON.stringify(contacts));
      setContacts(contacts);
    }
    else {
      localStorage.setItem('contacts', JSON.stringify([{ name, phoneNumber }]));
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
    }
    retrieveContacts();
  };

  const retrieveContacts = (): void => {
    if (localStorage.getItem('contacts')) {
      setContacts(JSON.parse(String(localStorage.getItem('contacts'))));
      return;
    }
    return;
  };

  const deleteContact = (phoneNumber: string): void => {
    const contacts: IContact[] = JSON.parse(String(localStorage.getItem('contacts')));
    const filteredContacts = contacts.filter((contact) => contact.phoneNumber !== phoneNumber);
    localStorage.setItem('contacts', JSON.stringify(filteredContacts));
    retrieveContacts();
  };

  useEffect((): void => {
    validateToken(history);
    retrieveContacts();
  }, []);


  return(
    <div id='main-container'>
      <Header />
      <div id='contact-container'>
        <div>
          { contacts.map((contact, index) => (
            <div
              id='contact'
              key={`${index}`}
            >
              <span> Nome: <strong>{ contact.name }</strong> </span>
              <span> Numero de Telefone: { contact.phoneNumber } </span>
              <button
                onClick={ () => deleteContact(contact.phoneNumber)}
              >
                Deletar
              </button>
            </div>
          ))
          }
        </div>
        <div id='add-contact-container'>
          <label htmlFor="contact-phoneNumber">Número do Contato:</label>
          <input
            placeholder='Exemplo: +5538123456789'
            type="text" 
            id='contact-phoneNumber'
            onChange={ ({ target }) => setPhoneNumber(target.value) }
          />
          <button
            disabled={ !(phoneNumber.length >= 10) }
            onClick={ getContactInfo }
          >
          Adicionar Contato
          </button>
        </div> 
      </div>
    </div>
  );
}

export default Contacts;