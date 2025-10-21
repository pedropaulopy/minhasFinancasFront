import React, {useEffect, useMemo, useState} from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import LancamentoService from "../../app/services/lancamentoService";
import SelectMenu from "../../components/selectMenu";
import {Link, useNavigate, useParams} from "react-router";
import localStorageService from "../../app/services/localStorageService";
import {mensagemErro, mensagemSucesso} from "../../components/toastr";



function CadastroLancamentos(){
    const service = useMemo(() => {
        return new LancamentoService();
    }, []);

    const [id, setId] = useState(null);
    const [ano, setAno] = useState();
    const [mes, setMes] = useState();
    const [descricao, setDescricao] = useState('');
    const [tipoLancamento, setTipoLancamento] = useState('');
    const [statusLancamento, setStatusLancamento] = useState('');
    const [valor, setValor] = useState();

    const navigate = useNavigate();
    const params = useParams();

    const listaMeses = service.obterListaMeses()
    const listaTipos = service.obterListaTipos()
    const listaStatus = service.obterListaStatus()

    const cadastrarLancamento = () => {
        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        if (!usuarioLogado || !usuarioLogado.id) {
            mensagemErro("Erro de Autenticação", "Seu usuário não foi encontrado. Faça login novamente.");
            return false;
        }

        const lancamento = {
            descricao: descricao,
            mes: mes,
            ano: ano,
            usuario: usuarioLogado.id,
            valor: Number(valor),
            statusLancamento: statusLancamento,
            tipoLancamento: tipoLancamento
        };

        try {
            if(params.id){

                service.atualizarLancamento(params.id, lancamento)
                    .then(response => {
                        mensagemSucesso("Sucesso!", "Lançamento atualizado com sucesso.");
                        navigate('/consulta-lancamentos');
                    })
                    .catch(erro => {
                        console.error("Erro ao ATUALIZAR:", erro.response.data);
                        const mensagemBackend = erro.response.data.message || erro.response.data;

                        mensagemErro("Erro ao Atualizar", mensagemBackend);
                        mensagemErro("Erro", erro.response.data);
                    });
            } else {
                service.cadastrarLancamento(lancamento)
                    .then(response => {
                        mensagemSucesso("Sucesso!", "Lançamento cadastrado com sucesso.");
                        navigate('/consulta-lancamentos');
                    })
                    .catch(erro => {
                        console.error("Erro ao ATUALIZAR (detalhe):", erro.response.data);
                        const mensagemBackend = erro.response.data.message || erro.response.data;

                        mensagemErro("Erro ao Atualizar", mensagemBackend);
                        mensagemErro("Erro", erro.response.data);
                    });
            }
        } catch (erro) {
            mensagemErro("Erro", erro.message);
        }
    }


    useEffect(() => {
        if(params.id){
            service.obterPorId(params.id)
                .then(response => {
                    console.log("Dados recebidos para edição:", response.data);
                    setId(response.data.id);
                    setDescricao(response.data.descricao);
                    setAno(response.data.ano);
                    setValor(response.data.valor);
                    setMes( response.data.mes || null );
                    setTipoLancamento( response.data.tipoLancamento || null );
                    setStatusLancamento( response.data.statusLancamento || null );
                })
                .catch(erro => {
                    mensagemErro("Erro", "Erro ao carregar lançamento para edição.");
                    console.error(erro.response);
                });
        }
    }, [params.id, service]);

    return(
        <Card title={params.id ? "Edição de Lançamento" : "Cadastro Lançamento"}>
            <div className={"row"} >
                <div className={"col-md-12"}>
                    <FormGroup Label={"Descrição: *"} id={"inputDescricao"} >
                        <input  id={"inputDescricao"} type={"text"} className={"form-control"} value={descricao || ''} onChange={e => setDescricao(e.target.value)}/>
                    </FormGroup>
                </div>
            </div>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <FormGroup id={"inputAno"} Label={"Ano: *"}>
                        <input id={"inputAno"} type={"text"} className={"form-control"} value={ano || ''} onChange={e => setAno(e.target.value)}/>
                    </FormGroup>
                </div>
                <div className={"col-md-6"}>
                    <FormGroup id={"inputMes"} Label={"Mês: *"}>
                        <SelectMenu
                            className={"form-control"}
                            value={mes || ''}
                            onChange={(e) => setMes(e.target.value)}
                            Lista={listaMeses} />
                    </FormGroup>
                </div>
            </div>
            <div className={"row"} >
                <div className={"col-md-4"}>
                    <FormGroup Label={"Valor: *"} id={"inputValor"} >
                        <input placeholder={"R$"} id={"inputValor"} type={"number"} className={"form-control"} value={valor || ''} onChange={e => setValor(e.target.value)}/>
                    </FormGroup>
                </div>
                <div className={"col-md-4"}>
                    <FormGroup Label={"Tipo: *"} id={"inputTipo"} >
                        <SelectMenu
                            className={"form-control"}
                            value={tipoLancamento || ''}
                            onChange={(e) => setTipoLancamento(e.target.value)}
                            Lista={listaTipos} />
                    </FormGroup>
                </div>
                <div className={"col-md-4"}>
                    <FormGroup Label={"Status: *"} id={"inputStatus"} >
                        <SelectMenu
                            className={"form-control"}
                            value={statusLancamento || ''}
                            onChange={(e) => setStatusLancamento(e.target.value)}
                            Lista={listaStatus} />
                    </FormGroup>
                </div>
            </div>

            <button onClick={cadastrarLancamento} type="button" className="btn btn-success">
                {id ? "Atualizar" : "Salvar"}
            </button>
            <Link to={"/consulta-lancamentos"} className="btn btn-danger">
                Cancelar
            </Link>
        </Card>
    )
}

export default CadastroLancamentos;