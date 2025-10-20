import React, { useState } from 'react'; // Importa o useState
import Card from "../components/card";
import FormGroup from "../components/form-group";
import axios from "axios";

import { mensagemErro, mensagemSucesso, mensagemAviso } from '../components/toastr';
import {useNavigate} from "react-router";

function CadastroUsuario() {

    // Substitui o this.state por hooks useState individuais
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaRepetida, setSenhaRepetida] = useState('');
    const navigate = useNavigate();

    const validar = () => {
        const msgs = []
        if(!nome){
            msgs.push("O campo nome é obrigatório.")
        }

        if(!email){
            msgs.push("O campo email é obrigatório.")
        }else if(!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push("Informe um email válido.")
        }

        if(!senha || !senhaRepetida){
            msgs.push("Digite a senha 2x")
        }else if(senha !== senhaRepetida){
            msgs.push("As senhas não são iguais.")
        }

        return msgs;
    }

    const cadastrar = () => {
        const msgs = validar();
        if(msgs && msgs.length > 0){
            msgs.forEach((msg) => {
                mensagemAviso("Atenção!", msg)
            })
            return false;
        }

        axios.post("http://localhost:8081/api/usuarios", {
            email: email,
            nome: nome,
            senha: senhaRepetida
        }).then(response => {
            mensagemSucesso("Sucesso", "Usuário cadastrado com sucesso!");
            navigate("/home");
        }).catch(erro => {
            mensagemErro("Erro", erro.response.data);
        });
    };

    // Calcula a variável diretamente
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
                                                               value={nome} // Usa a variável de estado
                                                               onChange={e => setNome(e.target.value)} // Usa a função setter
                                                               className={"form-control"}
                                                               id={"inputNome"}
                                                               placeholder={"Digite o Nome"} />
                                                        {/* Placeholder corrigido de 'Email' para 'Nome' */}
                                                    </FormGroup>

                                                    <FormGroup Label={"Email: *"} htmlFor={"exampleInputEmail"}>
                                                        <input type={"email"}
                                                               value={email} // Usa a variável de estado
                                                               onChange={e => setEmail(e.target.value)} // Usa a função setter
                                                               className={"form-control"}
                                                               id={"exampleInputEmail"}
                                                               aria-describedby={"emailHelp"}
                                                               placeholder={"Digite o Email"} />
                                                    </FormGroup>

                                                    <FormGroup Label={"Senha: *"} htmlFor={"exampleInputPassword1"}>
                                                        <input type={"password"}
                                                               value={senha} // Usa a variável de estado
                                                               onChange={e => setSenha(e.target.value)} // Usa a função setter
                                                               className={"form-control"}
                                                               id={"exampleInputPassword1"}
                                                               aria-describedby={"passwordHelp"}
                                                               placeholder={"Digite a Senha"}
                                                        />
                                                    </FormGroup>

                                                    <FormGroup Label={"Repita a senha: *"} htmlFor={"exampleInputPassword2"}>
                                                        {/* ID corrigido para ser único */}
                                                        <input type={"password"}
                                                               value={senhaRepetida} // Usa a variável de estado
                                                               onChange={e => setSenhaRepetida(e.target.value)} // Usa a função setter
                                                               className={"form-control"}
                                                               id={"exampleInputPassword2"}
                                                               aria-describedby={"passwordHelp"}
                                                               placeholder={"Repita a Senha"}
                                                        />
                                                        {/* Condicional usa as variáveis de estado */}
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