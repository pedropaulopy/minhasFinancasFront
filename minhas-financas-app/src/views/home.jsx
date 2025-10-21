import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import UsuarioService from "../app/services/usuarioService";

const service = new UsuarioService();

const Home = () => {
    const [saldo, setSaldo] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        const usuarioLogadoParse = JSON.parse(usuarioLogadoString)
        service.obterSaldoUsuarioPorId(usuarioLogadoParse.id)
            .then(response => {
                setSaldo(response.data)

            }).catch(error => {
                console.error(error.data)}
        )
    })

    return (
        <div className={"jumbotron"}>
            <h1 className={"display-3"}>Bem Vindo!</h1>
            <p className={"lead"}>Esse é o seu sistema de finanças.</p>
            <p className={"lead"}>Seu saldo para o mês atual é de R$ {saldo}</p>
            <hr className={"my-4"} />
            <p className={"lead"}>
                <button onClick={() => navigate('/cadastro-usuarios')} className={"btn btn-primary"} type="button">
                    <i className={"pi pi-user-plus"}></i> Cadastrar Usuário
                </button>
                <button
                    onClick={() => navigate('/cadastro-lancamentos')}
                    className={"btn btn-danger"}
                    style={{ marginLeft: '5px' }}
                    type="button"
                >
                    <i className={"pi pi-file-plus"}></i> Cadastrar Lançamento
                </button>
            </p>
        </div>
    );
}

export default Home;