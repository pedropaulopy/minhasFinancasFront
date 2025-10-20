import ApiService from "../apiService";

export default class LancamentoService extends ApiService{
    constructor() {
        super('/api/lancamentos');
    }

    obterListaMeses(){
        return [
            {label:'Selecione...', value:null},
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
    }

    obterListaTipos(){
        return [
            {label: 'Selecione...', value: null},
            {label:'Receita', value:'RECEITA'},
            {label:'Despesa', value:'DESPESA'}
        ]
    }

    consultar(LancamentoFiltro){
        const usuarioLogado = JSON.parse(localStorage.getItem('_usuario_logado'));

        if(!usuarioLogado || !usuarioLogado.id) {
            console.error("Usuário não logado para a consulta.");
            return Promise.reject(new Error("Usuário não logado."));
        }

        let params = `?usuario=${usuarioLogado.id}`;

        if(LancamentoFiltro.ano){
            params = `${params}&ano=${LancamentoFiltro.ano}`
        }
        if(LancamentoFiltro.mes){
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }
        if(LancamentoFiltro.tipo){
            params = `${params}&tipo_lancamento=${LancamentoFiltro.tipo}`
        }
        if(LancamentoFiltro.status){
            params = `${params}&status_lancamento=${LancamentoFiltro.status}`
        }
        if(LancamentoFiltro.descricao){
            params = `${params}&descricao=${LancamentoFiltro.descricao}`
        }

        return this.get(`/buscar${params}`)
    }

    deletar(id){
        return this.delete(`/deletar/${id}`)
    }
}