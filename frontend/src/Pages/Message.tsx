import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

function Message() {
  const [ message, setMessage ] = useState<string>();
  const [ roomId, setRoomId ] = useState<string>(); 
  const { userPhone } = useParams();
  const socketRef = useRef<Socket>();

  const addMessage = (message: string) => {
    const divMessages = document.getElementById('messages') as HTMLElement;
    console.log(message);
    divMessages.innerHTML += `<p> ${ message } </p>`;
  };

  const openChat = () => {
    socketRef.current?.emit('chat-open', { userPhone, token: JSON.parse(localStorage.getItem('token') as string )});
  };

  const sendMessage = () => {
    socketRef.current?.emit('message', { message, roomId });
  };

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://192.168.0.189:4000');
      openChat();
      socketRef.current.on('roomId', (roomId) => {
        setRoomId(roomId);
      });
      socketRef.current.on('message-receive', (message) => {
        addMessage(message);
      });
    }
  }, []);

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
