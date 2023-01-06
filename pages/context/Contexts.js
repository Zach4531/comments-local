import { createContext } from 'react';
import data from '../../public/data.json';

const CommentContext = createContext(null);
const UserContext = createContext(null);

export { CommentContext, UserContext };
