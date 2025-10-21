import React from "react";
import currencyFormatter from 'currency-formatter'
function LancamentosTable(props){
    const rows = props.Lancamentos.map( lancamento => {
        return(
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{lancamento.ano}</td>
                <td>{lancamento.mes}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale: 'pt-BR'})}</td>
                <td>{lancamento.tipoLancamento}</td>
                <td>{lancamento.statusLancamento}</td>
                <td>
                    <button title={"Efetivar"} disabled={lancamento.statusLancamento !== "PENDENTE"} type={"button"} className={"btn btn-success"} onClick={e => props.alterarStatus(lancamento, "EFETIVADO")} ><i className={"pi pi-check"}></i></button>
                    <button title={"Cancelar"} disabled={lancamento.statusLancamento !== "PENDENTE"} type={"button"} className={"btn btn-warning"} onClick={e => props.alterarStatus(lancamento, "CANCELADO")}><i className={"pi pi-ban"}></i></button>
                    <button title={"Editar"} type={"button"} className={"btn btn-primary"} onClick={e => props.editAction(lancamento)}><i className={"pi pi-pencil"}></i></button>
                    <button title={"Deletar"} type={"button"} className={"btn btn-danger"} onClick={e => props.deleteAction(lancamento)}><i className={"pi pi-trash"}></i></button>
                </td>
            </tr>
        )
    } )

    return(
        <table className={"table table-hover"}>
            <thead>
               <tr>
                   <th scope={"col"}>Descrição</th>
                   <th scope={"col"}>Ano</th>
                   <th scope={"col"}>Mes</th>
                   <th scope={"col"}>Valor</th>
                   <th scope={"col"}>Tipo</th>
                   <th scope={"col"}>Status</th>
                   <th scope={"col"}>Ações</th>
               </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable;