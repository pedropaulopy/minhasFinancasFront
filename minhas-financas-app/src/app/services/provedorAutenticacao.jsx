
import React, { useState, createContext, useContext } from 'react';
import AuthService from './authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAutenticado, setIsAutenticado] = useState(() =>
        AuthService.isUsuarioAutenticado()
    );

    const login = (usuario) => {
        AuthService.logar(usuario);
        setIsAutenticado(true);
    };

    const logout = () => {
        AuthService.removerUsuarioAutenticado();
        setIsAutenticado(false);
    };

    return (
        <AuthContext.Provider value={{ isAutenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};