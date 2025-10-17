import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router";

const Home = () => {
    const [saldo, setSaldo] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:8081/api/usuarios/saldo/12')
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
                <a href={"https://bootswatch.com/flatly/#"} role={"button"} className={"btn btn-danger"} style={{ marginLeft: '5px' }}>
                    <i className={"fa fa-users"}></i>
                    Cadastrar Lançamento
                </a>
            </p>
        </div>
    );
}

export default Home;