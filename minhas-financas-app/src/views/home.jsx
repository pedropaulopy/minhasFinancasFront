import React from "react";
import {Link} from "react-router";
class Home extends React.Component{
    state = {
        saldo:0
    }

    render() {
        return(
            <div className={"jumbotron"}>
                <h1 className={"display-3"}>Bem Vindo!</h1>
                <p className={"lead"}>Esse é o seu sistema de finanças.</p>
                <p className={"lead"}>Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className={"my-4"}/>
                <p className={"lead"}>
                    <Link to={"/cadastro-usuarios"} role={"button"} className={"btn btn-primary"}>
                        <i className={"fa fa-users"}></i>
                        Cadastrar Usuários
                    </Link>
                    <Link to={"https://bootswatch.com/flatly/#"} role={"button"} className={"btn btn-danger"}>
                        <i className={"fa fa-users"}></i>
                        Cadastrar Lançamento
                    </Link>
                </p>
            </div>
        )
    }
}


export default Home;