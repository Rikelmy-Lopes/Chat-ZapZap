import React from 'react';
import { useLocation } from 'react-router-dom';
import { IContact } from '../../Interface/Interfaces';

interface Props {
    contact: IContact;
    setSelectedPhone?: (phoneNumber: string | null) => void;
    deleteContact?: (phoneNumber: string) => void
}

function ContactItem({ contact, setSelectedPhone, deleteContact }: Props): JSX.Element {
  const { pathname } = useLocation();
  return(
    <>
      {
        pathname.includes('/chats') ? 
          (<button
            id='contact' 
            onClick={() => setSelectedPhone ? setSelectedPhone(contact.phoneNumber) : null } 
            key={`${contact.phoneNumber}`}
          >
            <span> Nome: <strong>{ contact.name }</strong> </span>
            <span> PhoneNumber: { contact.phoneNumber } </span>
          </button>)
          :
          (<div
            id='contact'
          >
            <span> Nome: <strong>{ contact.name }</strong> </span>
            <span> Numero de Telefone: { contact.phoneNumber } </span>
            <button
              onClick={ () => deleteContact ? deleteContact(contact.phoneNumber) : null}
            >
              Deletar
            </button>
          </div>)
      }
    </>
  );
}

export default ContactItem;