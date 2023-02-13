import { createContext } from 'react';
import data from '../../public/api/data.json';

const CommentContext = createContext(null);
const UserContext = createContext(null);

export { CommentContext, UserContext };
