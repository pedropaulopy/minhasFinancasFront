import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

const Home = () => {
    const [saldo, setSaldo] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioLogadoString = localStorage.getItem('_usuario_logado')
        if (!usuarioLogadoString) {
            // If not, redirect to login and stop the effect
            console.error("Usuário não logado. Redirecionando...");
            navigate('/login'); // <-- Ajuste para sua rota de login
            return;
        }
        const usuarioLogadoParse = JSON.parse(usuarioLogadoString)
        axios.get(`http://localhost:8081/api/usuarios/saldo/${usuarioLogadoParse.id}`)
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
                    Cadastrar Usuario
                </button>
                <button
                    // Assumindo que esta é a sua rota interna:
                    onClick={() => navigate('/')}
                    className={"btn btn-danger"}
                    style={{ marginLeft: '5px' }}
                    type="button"
                >
                    <i className={"fa fa-users"}></i>
                    Cadastrar Lançamento
                </button>
            </p>
        </div>
    );
}

export default Home;