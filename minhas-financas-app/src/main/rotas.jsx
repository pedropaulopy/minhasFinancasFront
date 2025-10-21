import React from "react";

import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home"
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos"
import CadastroLancamentos from "../views/lancamentos/cadastroLancamentos"
import {Routes, Route} from "react-router"

function Rotas(){
        return(
            <>
                <Routes>
                    <Route path={"/home"} element={<Home/>} />
                    <Route path={"/"} element={<Login/>}  />
                    <Route path={"/cadastro-usuarios"} element={<CadastroUsuario/>}  />
                    <Route path={"/consulta-lancamentos"} element={<ConsultaLancamentos/>} />
                    <Route path={"/cadastro-lancamentos/:id"} element={<CadastroLancamentos/>} />
                </Routes>
            </>
        )
}

export default Rotas