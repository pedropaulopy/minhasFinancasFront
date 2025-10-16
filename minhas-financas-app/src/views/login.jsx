import React from 'react'
import Card from "../components/card";
import FormGroup from "../components/form-group";
import withRouter from "react-router-dom/es/withRouter";
class Login extends React.Component{
    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log("Email: ", this.state.email);
        console.log("Senha: ", this.state.senha);
    };

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');
    }
    render() {
        return(
            <div className="container">
                <div className={"row"}>
                    <div className={"col-md-6"} style={{position:'relative', left:'300px'}}>
                        <div className={"bs-docs-section"}>
                            <Card title={"Login"}>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        <div className={"col-md-12"}>
                                            <div className={"bs-component"}>
                                                <form>
                                                    <fieldset>
                                                        <FormGroup Label={"Email: *"} htmlFor={"exampleInputEmail"}>
                                                            <input type={"email"}
                                                                   value={this.state.email}
                                                                   onChange={e => this.setState({email : e.target.value})}
                                                                   className={"form-control"}
                                                                   id={"exampleInputEmail"}
                                                                   aria-describedby={"emailHelp"}
                                                                   placeholder={"Digite o Email"}/>
                                                        </FormGroup>

                                                        <FormGroup Label={"Senha: *"} htmlFor={"exampleInputPassword1"}>
                                                            <input type={"senha"}
                                                                   value={this.state.senha}
                                                                   onChange={e => this.setState({senha : e.target.value})}
                                                                   className={"form-control"}
                                                                   id={"exampleInputPassword1"}
                                                                   aria-describedby={"passwordHelp"}
                                                                   placeholder={"Digite a Senha"}
                                                            />
                                                        </FormGroup>
                                                        <button onClick={this.entrar} type="button"
                                                                className="btn btn-success">Entrar
                                                        </button>
                                                        <button onClick={this.prepareCadastrar}
                                                                type="button" className="btn btn-danger">Cadastrar
                                                        </button>
                                                    </fieldset>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default  withRouter(Login);