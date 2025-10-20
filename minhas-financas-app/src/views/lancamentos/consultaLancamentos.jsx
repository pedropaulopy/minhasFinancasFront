import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import SelectMenu from "../components/selectMenu";

function ConsultaLancamentos(){
    const listaMeses = [
        {label:'Janeiro', value:1},
        {label:'Fevereiro', value:2},
        {label:'Março', value:3},
        {label:'Abril', value:4},
        {label:'Maio', value:5},
        {label:'Junho', value:6},
        {label:'Julho', value:7},
        {label:'Agosto', value:8},
        {label:'Setembro', value:9},
        {label:'Outubro', value:10},
        {label:'Novembro', value:11},
        {label:'Dezembro', value:12}
    ]

    const listaTipos = [
        {label:'Receita', value:'RECEITA'},
        {label:'Despesa', value:'DESPESA'}
    ]

    return(
        <Card title={"Consulta Lançamentos"}>
            <div className={"row"}>
                <div className={"col-md-6"}>
                    <div className={"bs-component"}>
                        <FormGroup Label={"Ano: *"}>
                            <input type={"text"} className={"form-control"}
                                   id={"inputAno"}
                                   aria-describedby={"emailHelp"}
                                   placeholder={"Digite o Ano"}/>
                        </FormGroup>
                        <FormGroup htmlFor="InputMes" Label={"Mês: "}>
                            <SelectMenu className={"form-control"} Lista={listaMeses} />
                        </FormGroup>
                        <FormGroup htmlFor="InputTipo" Label={"Tipo de Lançamento: "}>
                            <SelectMenu className={"form-control"} Lista={listaTipos} />
                        </FormGroup>
                        <button type={"button"} className={"btn btn-success"}>Buscar</button>
                        <button type={"button"} className={"btn btn-danger"}>Cadastrar</button>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-md-12"}>

                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ConsultaLancamentos;