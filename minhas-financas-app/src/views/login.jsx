import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { Link } from "react-router";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState(null);
    const navigate = useNavigate();

    const entrar = () => {
        axios.post('http://localhost:8081/api/usuarios/autenticar', {
            email: email,
            senha: senha
        }).then(response => {
            navigate("/");
        }).catch(erro => {
            let msg = 'Erro desconhecido. Tente novamente.';
            if (erro.response && erro.response.data) {
                msg = erro.response.data;
            } else if (erro.message) {
                msg = erro.message;
            }
            setMensagemErro(msg);
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