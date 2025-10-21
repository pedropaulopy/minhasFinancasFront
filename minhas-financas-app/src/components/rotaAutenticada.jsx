import React from 'react';
import { Navigate, useLocation } from 'react-router';
import AuthService from "../app/services/authService";

function RotaAutenticada({ children }) {
    const autenticado = AuthService.isUsuarioAutenticado();
    const location = useLocation();

    if (!autenticado) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RotaAutenticada;