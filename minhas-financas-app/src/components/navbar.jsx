import React from "react";
import {Link, useNavigate} from "react-router";
import {mensagemAviso} from "./toastr";
import {useAuth} from "../app/services/provedorAutenticacao";



function Navbar(){

    const { isAutenticado, logout } = useAuth();

    const deslogar = () =>{
        logout();
        mensagemAviso("Aviso","Usuário desconectado")
        navigate("/login")
    }

    const navigate = useNavigate()
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    {isAutenticado ? (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link title={"Home"} className="nav-link" to="/home"><i className={"pi pi-home"}></i> Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link title={"Lançamentos"} className="nav-link" to="/consulta-lancamentos"><i className={"pi pi-wallet"}></i> Lançamentos</Link>
                            </li>

                            <li className="nav-item">
                                <Link  title={"Cadastrar usuário"} className="nav-link" to="/cadastro-usuarios"><i className={"pi pi-user-plus"}></i> Cadastrar Usuário</Link>
                            </li>

                            <button className={"btn btn-danger"} onClick={deslogar}><i title={"Sair"} className={"pi pi-sign-out"}></i> Sair</button>
                        </ul>
                        ) : (
                            <>
                            </>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Navbar;