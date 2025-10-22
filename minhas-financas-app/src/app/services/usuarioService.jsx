import ApiService from './apiService'
import ErroValidacao from "../exception/ErroValidacao";

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

    validar(usuario){
        const erros = []
        if(!usuario.nome){
            erros.push("O campo nome é obrigatório.")
        }

        if(!usuario.email){
            erros.push("O campo email é obrigatório.")
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push("Informe um email válido.")
        }

        if(!usuario.senha || !usuario.senhaRepetida){
            erros.push("Digite a senha 2x")
        }else if(usuario.senha !== usuario.senhaRepetida){
            erros.push("As senhas não são iguais.")
        }

        if(erros&&erros.length>0){
            throw new ErroValidacao(erros)
        }

        return erros;
    }
}

export default UsuarioService