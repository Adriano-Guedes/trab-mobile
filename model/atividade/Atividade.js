import Materia from "../materia/materia.js";
import ModelError from "../utils/ModelError.js";

export default class Atividade{
    constructor(nome, descricao){
        this.setNome(nome);
        this.setDescricao(descricao);
        this.setMateria(materia)
    }

        getNome(){
            return this.nome;
        }
    
        setNome(nome){
            Atividade.validarNome(nome);
            this.nome = nome;
        }

        getDescricao(){
            return this.descricao;
        }
        
        setDescricao(descricao){
            Atividade.validarDescricao(descricao);
            this.descricao = descricao;
        }

        getMateria(){
            return this.materia;
        }
        
        setMateria(materia){
            Atividade.validarMateria(materia);
            this.materia = materia;
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
    
        static validarMateria(materia){
            let tammateria = materia.length;
            if(materia == null || materia == "" || materia == undefined){
                return new ModelError("Materia inválido!")
            }
            if(typeof(materia) !== String){
                return new ModelError("Materia precisa ser uma string!")
            }
            if(tammateria <= 0 || tammateria >= 250){
                return new ModelError("Materia deve possuir de 1 à 250 caracteres!")
            }
        }
    

}