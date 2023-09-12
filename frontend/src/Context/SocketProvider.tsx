import { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import socketContext from './SocketContext';

function SocketProvider({ children }: PropsWithChildren ) {
  const allowRoutes: string[] = ['/chats', '/contacts'];
  const { pathname } = useLocation();
  const [ socket, setSocket ] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const socketHost = import.meta.env.VITE_BACKEND_HOST_SOCKET;
    if (allowRoutes.includes(pathname) && socket === undefined) {
      setSocket(io(socketHost));
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