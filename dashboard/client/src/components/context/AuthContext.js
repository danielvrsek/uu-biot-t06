import { createContext, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const useClearAuth = () => {
    const [, setAuth] = useAuth();
    return () => setAuth({ user: null, workspace: null });
};
