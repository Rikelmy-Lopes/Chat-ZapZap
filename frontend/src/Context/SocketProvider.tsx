import React, { useState, useEffect, PropsWithChildren } from 'react';
import socketContext from './SocketContext';
import { io, Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';

function SocketProvider({ children }: PropsWithChildren ) {
  const allowRoutes: string[] = ['/chats', '/contacts'];
  const { pathname } = useLocation();
  const [ socket, setSocket ] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    if (allowRoutes.includes(pathname) && socket === undefined) {
      setSocket(io('http://192.168.0.189:4000'));
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return(
    <socketContext.Provider value={ socket }>
      { children }
    </socketContext.Provider>);
}

export default SocketProvider;