import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

function Message() {
  const [ message, setMessage ] = useState<string>();
  const [ roomId, setRoomId ] = useState<string>(); 
  const socket = io('http://192.168.0.189:4000');
  const { userPhone } = useParams();

  const addMessage = (message: string) => {
    const divMessages = document.getElementById('messages') as HTMLElement;
    console.log(message);
    divMessages.innerHTML += `<p> ${ message } </p>`;
  };

  socket.on('message-receive', (message) => {
    addMessage(message);
  });

  const openChat = () => {
    socket.emit('chat-open', { userPhone, token: JSON.parse(localStorage.getItem('token') as string )});
  };
  

  useEffect(() => {
    openChat();
    socket.on('roomId', (roomId) => {
      setRoomId(roomId);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('message', { message, roomId });
  };


  return(
    <div>
      <h2>Conversando com: Name</h2>
      <input
        placeholder='Digite sua mensagem'
        type="text" 
        name="" 
        onChange={({ target }) => setMessage(target.value)}
      />
      <button
        onClick={ sendMessage }
      >
          Enviar
      </button>

      <div id='messages'>

      </div>
    </div>
  );
}

export default Message;