import { getDatabase, ref, query, onValue, onChildAdded, orderByChild, 
    child, orderByKey, equalTo, get, set, remove, push, runTransaction } 
from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

// Importamos a definição da classe Curso
import Atividade from "/Atividade.js";
// Importamos a definição da classe Curso
import AtividadeDTO from "/AtividadeDTO.js";
// Importamos a definição da classe ModelError
import ModelError from "../utils/ModelError.js";

export default class DaoAtividade{
    static promessaConexao = null;

    constructor(){
        this.obterConexao();
    }

    /*
   *  Devolve uma Promise com a referência para o BD. Sempre que 'obterConexao' for chamado, 
   *  será necessário usar o await para recuperar o IDBDatabase.
   */ 
  async obterConexao() {
    // Como 'promessaConexao' é um atributo estático, usamos o nome da classe 
    // para acessá-lo
    if(DaoAtividade.promessaConexao == null) {
      DaoAtividade.promessaConexao = new Promise((resolve, reject) => {
        const db = getDatabase();
        if(db)
            resolve(db);
        else 
            reject(new ModelError("Não foi possível estabelecer conexão com o BD"));
      });
    }
    return DaoAtividade.promessaConexao;
  }

  async obterAtividadePeloNome(nome) {
    try {
        let connectionDB = await this.obterConexao();
        return new Promise(async (resolve, reject) => {
            try {
                // Definindo uma 'ref' para o objeto no banco de dados
                let dbRefAtividade = ref(connectionDB, 'atividade/' + nome);
                // Executando a consulta a partir da 'ref'
                let consulta = query(dbRefAtividade);
                // Obtendo os dados da query
                let dataSnapshot = await get(consulta); // Obtém o snapshot diretamente com await
                let atividade = dataSnapshot.val();

                // Se há algum objeto no Firebase dado como resposta
                if (atividade != null) {
                    resolve(new Atividade(atividade.nome, atividade.descricao, atividade.materia));
                } else {
                    resolve(null);
                }
            } catch (err) {
                reject(`Erro ao consultar atividade: ${err.message}`);
            }
        });
    } catch (err) {
        throw new Error(`Erro ao obter conexão com o banco: ${err.message}`);
    }
 }

 async obterAtividades() {
    try {
        let connectionDB = await this.obterConexao();
        let retorno = [];
        return new Promise(async (resolve, reject) => {
            try {
                // Definindo uma 'ref' para o objeto no banco de dados
                let dbRefAtividade = ref(connectionDB, 'atividades');
                // Executando a query
                let consulta = query(dbRefAtividade);
                // Obtendo os dados da query
                let resposta = await get(consulta);
                resposta.then(x => {
                    let obj = x.val();
                    retorno.push(new Atividade(obj.nome, obj.descricao, obj.materia))
                });

                resolve(retorno)
            } catch (err) {
                reject(`Erro ao consultar atividade: ${err.message}`);
            }
        });
    } catch (err) {
        throw new Error(`Erro ao obter conexão com o banco: ${err.message}`);
    }
 }

 async saveAtividade(atividade){
    try {
        let connectionDB = await this.obterConexao();
        let retorno = [];
        return new Promise(async (resolve, reject) => {
            try {
                // Definindo uma 'ref' para o objeto no banco de dados
                let dbRefAtividade = ref(connectionDB, 'atividades');
                runTransaction(dbRefAtividade, (atividade) =>{
                    // Monto um child de 'atividades', onde vamos pendurar o novo atividade. Esse filho 
                    // de 'atividades' que é formado pela 'ref' 'atividades' (dbRefAtividade) mais a sigla 
                    // do novo atividade
                    let dbRefNovoAtividade = child(dbRefAtividade,atividade.getSigla());
                    // 'set' é utilizado para incluir um novo objeto no Firebase a partir de seu 
                    // 'ref'. Como devolve uma promise, definimos o resultado pelo 'then'
                    let setPromise = set(dbRefNovoAtividade,atividade);
                    // Definimos o resultado da operação
                    setPromise.then( value => {resolve(true)}).catch((e) => {console.log("#ERRO: " + e);resolve(false);});
                });
            } catch (err) {
                reject(`Erro ao salvar atividade: ${err.message}`);
            }
        });
    } catch (err) {
        throw new Error(`Erro ao obter conexão com o banco: ${err.message}`);
    }
 }

 async alterar(curso) {
    // Recuperando a conexão com o Realtime Database
    let connectionDB = await this.obterConexao();    
    // Retornamos uma Promise que nos informará se a inclusão foi realizada ou não
    return new Promise( (resolve, reject) => {
      // Monto a 'ref' para a entrada 'cursos' para a inclusão
      let dbRefCursos = ref(connectionDB,'cursos');
      // Inicio uma transação
      runTransaction(dbRefCursos, (cursos) => {       
        // Monto um child de 'cursos', onde vamos colocar a alteração do . Esse filho 
        // de 'cursos' que é formado pela 'ref' 'cursos' (dbRefCursos) mais a sigla 
        // do novo curso
        let dbRefCursoAlterado = child(dbRefCursos,curso.getSigla());
        // 'set' também é utilizado para alterar um objeto no Firebase a partir de seu 
        // 'ref'. Como devolve uma promise, definimos o resultado pelo 'then'
        let setPromise = set(dbRefCursoAlterado,curso);
        // Definimos o resultado da operação
        setPromise.then( value => {resolve(true)}).catch((e) => {console.log("#ERRO: " + e);resolve(false);});
      });
    });
    return resultado;
  }

}