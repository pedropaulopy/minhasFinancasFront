import React, {useState} from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/services/lancamentoService"
import {mensagemErro, mensagemSucesso} from '../../components/toastr'


function ConsultaLancamentos(){
    const [ano, setAno] = useState();
    const [mes, setMes] = useState();
    const [tipo, setTipo] = useState();
    const [descricao, setDescricao] = useState();
    const [lancamentos, setLancamentos] = useState([]);
    const service = new LancamentoService();

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

    const editar = (id) => {
        service.put(id)
    }

    const deletar = (lancamento) => {
        service.deletar(lancamento.id)
            .then(mensagemSucesso("Sucesso!", "Lançamento deletado"))
            .catch(mensagemErro("Erro", "Ocorreu algum erro ao tentar deletar o lançamento."))
    }

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
                        <button type={"button"} className={"btn btn-success"} onClick={buscar}>Buscar</button>
                        <button type={"button"} className={"btn btn-danger"} >Cadastrar</button>
                    </div>
                </div>
            </div>
            <br/>
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <div className={"bs-component"}>
                        <LancamentosTable Lancamentos={lancamentos} deleteAction={deletar} editAction={editar}/>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ConsultaLancamentos;