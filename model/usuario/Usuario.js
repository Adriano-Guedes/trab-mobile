export default class Usuario {
    constructor(nome,data_nasc,email){
        this.nome = nome
        this.data_nasc = data_nasc
        this.email = email
    }
getNome(){
   return this.nome
}

setNome(nome){
        Usuario.validarNome(nome);
        this.nome = nome;     
}
getData_nasc(){
    return this.data_nasc
}

setData_nasc(data_nasc){
    Usuario.ValidarData_nasc(data_nasc)
    this.data_nasc = data_nasc
}

getEmail(){
    return this.email
}

setEmail(email){
    Usuario.ValidarEmail(email)
    this.email = email
}
//------------------------------------------------------

static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      throw new ModelError("O Nome do Aluno não pode ser nulo!");
    if (nome.length > 40) 
      throw new ModelError("O Nome do Aluno deve ter até 40 caracteres!");
    const padraoNome = /[A-Z][a-z] */;
    if (!padraoNome.test(nome)) 
      throw new ModelError("O Nome do Aluno só pode conter letras !");
  }

//---------------------------------------------------------



static validarEmail(email) {
    if(email == null || email == "" || email == undefined)
      throw new ModelError("O Email do Aluno não pode ser nulo!");

    const padraoEmail = /[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}/;
    if (!padraoEmail.test(email)) 
      throw new ModelError("O Email do Aluno não foi digitado corretamente!");
  }

//------------------------------------------------------------

static ValidarData_nasc(dataNascimento) {
    // Regex para validar formato (DD/MM/AAAA)
    const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataNascimento.match(regexData);

    if (!match) {
        return { valido: false, mensagem: "Formato inválido! Use DD/MM/AAAA." };
    }

    let dia = parseInt(match[1], 10);
    let mes = parseInt(match[2], 10) - 1; // Meses no JS são base 0 (Jan = 0, Fev = 1, ...)
    let ano = parseInt(match[3], 10);

    let data = new Date(ano, mes, dia);
    let hoje = new Date();
    let idade = hoje.getFullYear() - ano;

    // Verificar se a data é válida e se o dia/mês/ano conferem
    if (data.getDate() !== dia || data.getMonth() !== mes || data.getFullYear() !== ano) {
        return { valido: false, mensagem: "Data inválida!" };
    }

    // Verificar se a idade está dentro de um intervalo razoável
    if (idade < 0 || idade > 130) {
        return { valido: false, mensagem: "Idade fora do intervalo permitido!" };
    }

    return { valido: true, mensagem: "Data válida!" };
}
}