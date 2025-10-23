import React, {useState, createContext, useContext, useEffect} from 'react';
import AuthService from './authService';
import {jwtDecode} from "jwt-decode";
export const AuthContext = createContext();

export function AuthProvider({ children }) {

    useEffect(() => {
        const isAutenticado = AuthService.isUsuarioAutenticado()
        if(isAutenticado){
            setIsAutenticado(true)
        }
    }, []);

    const [isAutenticado, setIsAutenticado] = useState(() =>
        AuthService.isUsuarioAutenticado()
    );

    const login = (tokenDTO) => {
        const token = tokenDTO.token
        const claims = jwtDecode(token)
        const usuario = {
            id: claims.idUsuario,
            nome: claims.nome
        }
        AuthService.logar(usuario, token);
        setIsAutenticado({isAutenticado:true, usuarioAutenticado:usuario});
        console.log(usuario.id)
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