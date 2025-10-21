import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { Link } from "react-router";
import usuarioService from "../app/services/usuarioService";
import localStorageService from '../app/services/localStorageService'

import {mensagemErro, mensagemSucesso} from '../components/toastr'

const service = new usuarioService();

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();


    const entrar = () => {
        service.autenticar( {
            email: email,
            senha: senha
        }).then(response => {
            localStorageService.adicionarItem('_usuario_logado', response.data)
            mensagemSucesso("Credenciais corretas", "Usuario logado com sucesso!")
            navigate("/home");
        }).catch(erro => {
            if (erro.response && erro.response.data) {
                mensagemErro("Erro", erro.response.data);
            } else {
                // Erro de rede ou outro erro (ex: servidor offline)
                const msg = erro.message || "Não foi possível conectar ao servidor. Tente novamente.";
                mensagemErro("Erro", msg);
            }
        });
    };

    return (
        <div className="container">
            <div className={"row"}>
                <div className={"col-md-6"} style={{position:'relative', left:'300px'}}>
                    <div className={"bs-docs-section"}>
                        <Card title={"Login"}>
                            <div className={"row"}><span>{mensagemErro}</span></div>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <div className={"bs-component"}>
                                            <form>
                                                <fieldset>
                                                    <FormGroup Label={"Email: *"} htmlFor={"exampleInputEmail"}>
                                                        <input
                                                            type={"email"}
                                                            value={email}
                                                            onChange={e => setEmail(e.target.value)}
                                                            className={"form-control"}
                                                            id={"exampleInputEmail"}
                                                            aria-describedby={"emailHelp"}
                                                            placeholder={"Digite o Email"}
                                                        />
                                                    </FormGroup>
                                                    <FormGroup Label={"Senha: *"} htmlFor={"exampleInputPassword1"}>
                                                        <input
                                                            type={"password"}
                                                            value={senha}
                                                            onChange={e => setSenha(e.target.value)}
                                                            className={"form-control"}
                                                            id={"exampleInputPassword1"}
                                                            aria-describedby={"passwordHelp"}
                                                            placeholder={"Digite a Senha"}
                                                        />
                                                    </FormGroup>
                                                    <button onClick={entrar} type="button" className="btn btn-success">
                                                        Entrar
                                                    </button>
                                                    <Link to={"/cadastro-usuarios"} className="btn btn-danger">
                                                        Cadastrar
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
    );
};

export default Login;