import { Socket } from 'socket.io-client';
import { createContext } from 'react';

const socketContext = createContext<Socket | undefined>(undefined);

export default socketContext;