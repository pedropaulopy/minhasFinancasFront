import React from 'react'
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {Link} from "react-router"
class CadastroUsuario extends React.Component{


    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepetida: ''
    }

    cadastrar = () => {
        console.log("Nome: ", this.state.nome);
        console.log("Email: ", this.state.email);
        console.log("Senha: ", this.state.senha);
    };

    prepareLogin = () => {

    }

    render() {
        const senhasIguais = this.state.senha === this.state.senhaRepetida;
        return(
            <div className="container">
                <div className={"row"}>
                    <div className={"col-md-6"} style={{position:'relative', left:'300px'}}>
                        <div className={"bs-docs-section"}>
                            <Card title={"Cadastro de Usuario"}>
                                <div className={"card-body"}>
                                    <div className={"row"}>
                                        <div className={"col-md-12"}>
                                            <div className={"bs-component"}>
                                                <form>
                                                    <fieldset>
                                                        <FormGroup Label={"Nome: *"} htmlFor={"inputNome"}>
                                                            <input type={"text"}
                                                                   value={this.state.nome}
                                                                   onChange={e => this.setState({nome : e.target.value})}
                                                                   className={"form-control"}
                                                                   id={"inputNome"}
                                                                   placeholder={"Digite o Email"}/>
                                                        </FormGroup>

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
                                                            <input type={"password"}
                                                                   value={this.state.senha}
                                                                   onChange={e => this.setState({senha : e.target.value})}
                                                                   className={"form-control"}
                                                                   id={"exampleInputPassword1"}
                                                                   aria-describedby={"passwordHelp"}
                                                                   placeholder={"Digite a Senha"}
                                                            />
                                                        </FormGroup>

                                                        <FormGroup Label={"Repita a senha: *"} htmlFor={"exampleInputPassword1"}>
                                                            <input type={"password"}
                                                                   value={this.state.senhaRepetida}
                                                                   onChange={e => this.setState({senhaRepetida : e.target.value})}
                                                                   className={"form-control"}
                                                                   id={"exampleInputPassword1"}
                                                                   aria-describedby={"passwordHelp"}
                                                                   placeholder={"Repita a Senha"}
                                                            />
                                                            {this.state.senha && this.state.senhaRepetida && this.state.senha !== this.state.senhaRepetida && (
                                                                <small style={{ color: 'red' }}>
                                                                    As senhas não coincidem.
                                                                </small>
                                                            )}
                                                        </FormGroup>

                                                        <button disabled={!senhasIguais}
                                                                onClick={this.cadastrar}
                                                                type="button" className="btn btn-success">Cadastrar
                                                        </button>
                                                        <Link to={"/login"} className="btn btn-danger">Cancelar
                                                        </Link>
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

export default CadastroUsuario;