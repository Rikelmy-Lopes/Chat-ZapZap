import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactItem from '../../Components/ContactItem/ContactItem';
import Header from '../../Components/Header/Header';
import Message from '../../Components/Message/Message';
import { IContact } from '../../Interface/Interfaces';
import { validateToken } from '../../Utils/Auth';
import './Chats.css';

function Chats(): JSX.Element {
  const history = useNavigate();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<null | string>(null);

  const retrieveContacts =  async (): Promise<void> => {
    const host = import.meta.env.VITE_BACKEND_HOST;
    const { phoneNumber } = JSON.parse(String(localStorage.getItem('user')));
    try {
      const { data } = await axios.get(`${host}/rooms`, {
        headers: {
          phoneNumber
        }
      });
      setContacts(data);
    }
    catch(e){
      console.log(e);
    }
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
            contacts={contacts}
          />
          }
            
        </div>
      </div>
    </div>
  );
}

export default Chats;