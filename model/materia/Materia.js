import ModelError from "../utils/ModelError.js";

export default class Materia{
    constructor(nome, descricao, usuario){
        this.setNome(nome);
        this.setDescricao(descricao);
        this.setUsuario(usuario)
    }

    getNome(){
        return this.nome;
    }

    setNome(nome){
        Materia.validarNome(nome);
        this.nome = nome;
    }

    getDescricao(){
        return this.descricao;
    }

    setDescricao(descricao){
        Materia.validarDescricao(descricao);
        this.descricao = descricao;
    }

    getUsuario(){
        return this.usuario;
    }

    setUsuario(usuario){
        Materia.validarUsuario(usuario);
        this.usuario = usuario;
    }

    static validarNome(nome){
        let tamNome = nome.length;
        if(nome == null || nome == "" || nome == undefined){
            return new ModelError("Nome inválido!")
        }
        if(typeof(nome) !== String){
            return new ModelError("Nome precisa ser uma string!")
        }
        if(tamNome <= 0 || tamNome >= 50){
            return new ModelError("Nome deve possuir entre 1 e 50 caracteres!")
        }
    }

    static validarDescricao(descricao){
        let tamDescricao = descricao.length;
        if(descricao == null || descricao == "" || descricao == undefined){
            return new ModelError("Descrição inválido!")
        }
        if(typeof(descricao) !== String){
            return new ModelError("Descrição precisa ser uma string!")
        }
        if(tamDescricao <= 0 || tamDescricao >= 250){
            return new ModelError("Descrição deve possuir de 1 à 250 caracteres!")
        }
    }

    static validarUsuario(usuario){
        let tamUsuario = usuario.length;
        if(usuario == null || usuario == "" || usuario == undefined){
            return new ModelError("Descrição inválido!")
        }
        if(typeof(usuario) !== String){
            return new ModelError("Descrição precisa ser uma string!")
        }
        if(tamUsuario <= 0 || tamUsuario >= 250){
            return new ModelError("Descrição deve possuir de 1 à 250 caracteres!")
        }
    }
}