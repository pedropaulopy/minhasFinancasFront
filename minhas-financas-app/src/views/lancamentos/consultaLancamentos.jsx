import React, {useMemo, useState} from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/services/lancamentoService"
import {mensagemErro, mensagemSucesso} from '../../components/toastr'
import {Dialog} from 'primereact/dialog'
import {Button} from "primereact/button";
import {useNavigate} from "react-router";

function ConsultaLancamentos(){
    const [ano, setAno] = useState();
    const [mes, setMes] = useState();
    const [tipo, setTipo] = useState();
    const [descricao, setDescricao] = useState();
    const [showConfirmDialog, setShowConfirmDialog] = useState();
    const [lancamentos, setLancamentos] = useState([]);
    const [lancamentoDeletar, setLancamentoDeletar] = useState({});

    const service = useMemo(() => {
        return new LancamentoService();
    }, []);

    const navigate = useNavigate();

    const listaMeses = service.obterListaMeses()
    const listaTipos = service.obterListaTipos()

    const buscar = () => {
        const lancamentoFiltro = {
            ano: ano,
            descricao: descricao,
            mes: mes,
            tipo: tipo
        }

        service.consultar(lancamentoFiltro).then(response => {
            const lista = response.data
            if(!ano){
                mensagemErro("Erro", "Informe ao menos o ano.")
                return
            }
            if(lista.length===0){
                mensagemErro("Erro", "Nenhum lançamento encontrado para os parâmetros passados.")
                return
            }
            console.log(response.data)
            setLancamentos(response.data)
        }).catch(error => {
            console.error("Erro", error.response)
        })
    }

    const editar = (lancamento) => {
        service.obterPorId(lancamento.id)
        navigate(`/cadastro-lancamentos/${lancamento.id}`)
    }

    const deletar = () => {
        service.deletar(lancamentoDeletar.id).then(response => {
            const novosLancamentos = lancamentos.filter(l => l.id !== lancamentoDeletar.id);
            setLancamentos(novosLancamentos);
            setShowConfirmDialog(false)
            mensagemSucesso("Sucesso!", "Lançamento deletado com sucesso");
        }).catch(error => {
            mensagemErro("Erro", "Ocorreu um erro ao tentar deletar o lançamento.");
            console.error(error);
        });
    }

    const abrirConfirmacao = (lancamento) => {
        setShowConfirmDialog(true)
        setLancamentoDeletar(lancamento)
    }

    const fecharConfirmacao = () => {
        setShowConfirmDialog(false)
        setLancamentoDeletar({})
    }

    const prepareCadastrarLancamento = () => {
        navigate('/cadastro-lancamentos')
    }

    const alterarStatus = (lancamento, statusLancamento) => {
        service.alterarStatus(lancamento.id, statusLancamento)
            .then(response => {
                const novosLancamentos = lancamentos.map(l => {
                    if (l.id === lancamento.id) {
                        return { ...l, statusLancamento: statusLancamento };
                    }
                    return l;
                });

                setLancamentos(novosLancamentos);
                mensagemSucesso("Sucesso!", "Status atualizado com sucesso.");
            })
            .catch(error => {
                mensagemErro("Erro", "Ocorreu um erro ao tentar atualizar o status.");
                console.error(error);
            });
    }

    const confirmDialogFooter = (
        <div>
            <Button label={"Confirmar"} icon={"pi pi-check"} onClick={deletar}/>
            <Button label={"Cancelar"} icon={"pi pi-times"} onClick={fecharConfirmacao} className={"p-button-secondary"}/>
        </div>
    )

    return(
        <Card title={"Consulta Lançamentos"}>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <div className={"bs-component"}>
                        <FormGroup Label={"Ano: *"}>
                            <input type={"text"} className={"form-control"}
                                   id={"inputAno"}
                                   aria-describedby={"emailHelp"}
                                   placeholder={"Digite o Ano"}
                                   value={ano}
                                   onChange={(e) => setAno(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup Label={"Descrição: "}>
                            <input type={"text"} className={"form-control"}
                                   id={"inputDesc"}
                                   placeholder={"Descrição"}
                                   value={descricao}
                                   onChange={(e) => setDescricao(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup htmlFor="InputMes" Label={"Mês: "}>
                            <SelectMenu className={"form-control"}
                                        value={mes}
                                        onChange={(e) => setMes(e.target.value)}
                                        Lista={listaMeses} />
                        </FormGroup>
                        <FormGroup htmlFor="InputTipo" Label={"Tipo de Lançamento: "}>
                            <SelectMenu className={"form-control"}
                                        Lista={listaTipos}
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                            />
                        </FormGroup>
                        <button  title={"Buscar"} type={"button"} className={"btn btn-success"} onClick={buscar}><i className={"pi pi-search"}></i> Buscar</button>
                        <button title={"Cadastrar lançamento"} type={"button"} className={"btn btn-danger"} onClick={prepareCadastrarLancamento}><i className={"pi pi-file-plus"}></i> Cadastrar Lançamento</button>
                    </div>
                </div>
            </div>
            <br/>
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <div className={"bs-component"}>
                        <LancamentosTable Lancamentos={lancamentos} deleteAction={abrirConfirmacao} editAction={editar} alterarStatus={alterarStatus}/>
                    </div>
                </div>
            </div>
            <div>
                <Dialog header={"Deletar Lançamento"} footer={confirmDialogFooter} visible={showConfirmDialog} style={{width: '50vw'}} modal={true} onHide={() => setShowConfirmDialog(false)}>
                    Deseja deletar esse lançamento?
                </Dialog>
            </div>
        </Card>
    )
}

export default ConsultaLancamentos;