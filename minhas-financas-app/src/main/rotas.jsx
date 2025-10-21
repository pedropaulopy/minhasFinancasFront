import React from "react";
import { Routes, Route } from "react-router"; // Use 'react-router-dom'

import AuthService from "../app/services/authService";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos";

import RotaAutenticada from "../components/rotaAutenticada";

function Rotas() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />


            <Route
                path="/home"
                element={
                    <RotaAutenticada>
                        <Home />
                    </RotaAutenticada>
                }
            />

            <Route
                path="/consulta-lancamentos"
                element={
                    <RotaAutenticada>
                        <ConsultaLancamentos />
                    </RotaAutenticada>
                }
            />

            <Route
                path="/cadastro-lancamentos"
                element={
                    <RotaAutenticada>
                        <CadastroLancamentos />
                    </RotaAutenticada>
                }
            >
                <Route
                    path=":id"
                    element={
                        <RotaAutenticada>
                            <CadastroLancamentos />
                        </RotaAutenticada>
                    }
                />
            </Route>

        </Routes>
    );
}

export default Rotas;