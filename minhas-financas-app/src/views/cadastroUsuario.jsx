import React, { useState } from 'react'; // Importa o useState
import Card from "../components/card";
import FormGroup from "../components/form-group";
import axios from "axios";
import usuarioService from "../app/services/usuarioService";
import { mensagemErro, mensagemSucesso} from '../components/toastr';
import {useNavigate} from "react-router";

function CadastroUsuario() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const navigate = useNavigate();
    const service = new usuarioService()

    const cadastrar = () => {
        const usuario = { nome, email, senha, senhaRepetida };
        try {
            service.validar(usuario);
        } catch(erro) {
            const msgs = erro.mensagens;
            if (msgs && msgs.forEach) {
                msgs.forEach(msg => mensagemErro("Erro de validação",msg));
            } else {
                mensagemErro("Erro de validação: " + erro.message);
            }
            return;
        }
        axios.post("http://localhost:8081/api/usuarios", {
            email: email,
            nome: nome,
            senha: senha
        }).then(response => {
            mensagemSucesso("Sucesso", "Usuário cadastrado com sucesso!");
            navigate("/home");
        }).catch(erro => {
            const msgs = erro.response ? erro.response.data : null;

            if (Array.isArray(msgs)) {
                msgs.forEach(msg => mensagemErro(msg));
            } else if (typeof msgs === 'string') {
                mensagemErro(msgs);
            } else {
                mensagemErro("Ocorreu um erro no servidor. Tente novamente.");
            }
            return false;
        });
    };

    const senhasIguais = senha === senhaRepetida;

    return (
        <div className="container">
            <div className={"row"}>
                <div className={"col-md-6"} style={{ position: 'relative', left: '300px' }}>
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
                                                               value={nome}
                                                               onChange={e => setNome(e.target.value)}
                                                               className={"form-control"}
                                                               id={"inputNome"}
                                                               placeholder={"Digite o Nome"} />
                                                    </FormGroup>

                                                    <FormGroup Label={"Email: *"} htmlFor={"exampleInputEmail"}>
                                                        <input type={"email"}
                                                               value={email}
                                                               onChange={e => setEmail(e.target.value)}
                                                               className={"form-control"}
                                                               id={"exampleInputEmail"}
                                                               aria-describedby={"emailHelp"}
                                                               placeholder={"Digite o Email"} />
                                                    </FormGroup>

                                                    <FormGroup Label={"Senha: *"} htmlFor={"exampleInputPassword1"}>
                                                        <input type={"password"}
                                                               value={senha} // Usa a variável de estado
                                                               onChange={e => setSenha(e.target.value)}
                                                               className={"form-control"}
                                                               id={"exampleInputPassword1"}
                                                               aria-describedby={"passwordHelp"}
                                                               placeholder={"Digite a Senha"}
                                                        />
                                                    </FormGroup>

                                                    <FormGroup Label={"Repita a senha: *"} htmlFor={"exampleInputPassword2"}>
                                                        <input type={"password"}
                                                               value={senhaRepetida}
                                                               onChange={e => setSenhaRepetida(e.target.value)}
                                                               className={"form-control"}
                                                               id={"exampleInputPassword2"}
                                                               aria-describedby={"passwordHelp"}
                                                               placeholder={"Repita a Senha"}
                                                        />
                                                        {senha && senhaRepetida && senha !== senhaRepetida && (
                                                            <small style={{ color: 'red' }}>
                                                                As senhas não coincidem.
                                                            </small>
                                                        )}
                                                    </FormGroup>

                                                    <button disabled={!senhasIguais}
                                                            onClick={cadastrar}
                                                            type="button" className="btn btn-success">Cadastrar
                                                    </button>
                                                    <button onClick={() => navigate('/')} type="button" className="btn btn-danger">
                                                        Cancelar
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

export default CadastroUsuario;