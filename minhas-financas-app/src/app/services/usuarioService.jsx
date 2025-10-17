import ApiService from '../apiService'

class UsuarioService extends ApiService{
    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoUsuarioPorId(id){
        return this.get(`/saldo/${id}`);
    }
}

export default UsuarioService