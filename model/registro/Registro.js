export default class Registro {
    constructor(nome, data_nasc, email) {
        this._nome = this._validarNome(nome) ? nome : "Nome inválido";
        this._data_nasc = this._validarData(data_nasc) ? data_nasc : "Data inválida";
        this._email = this._validarEmail(email) ? email : "E-mail inválido";
    }

    // Getter e Setter para Nome
    get nome() {
        return this._nome;
    }

    set nome(novoNome) {
        if (this._validarNome(novoNome)) {
            this._nome = novoNome;
        } else {
            throw new Error("Nome inválido! Deve conter apenas letras e ter pelo menos 2 caracteres.");
        }
    }

    // Getter e Setter para Data de Nascimento
    get data_nasc() {
        return this._data_nasc;
    }

    set data_nasc(novaData) {
        if (this._validarData(novaData)) {
            this._data_nasc = novaData;
        } else {
            throw new Error("Formato de data inválido! Use DD/MM/AAAA.");
        }
    }

    // Getter e Setter para Email
    get email() {
        return this._email;
    }

    set email(novoEmail) {
        if (this._validarEmail(novoEmail)) {
            this._email = novoEmail;
        } else {
            throw new Error("E-mail inválido! Use um formato válido (exemplo@dominio.com).");
        }
    }

    // Método para validar Nome (Apenas letras e mínimo de 2 caracteres)
    _validarNome(nome) {
        const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/; // Permite letras e espaços, mínimo 2 caracteres
        return regexNome.test(nome);
    }

    // Método para validar Data de Nascimento no formato DD/MM/AAAA
    _validarData(data) {
        const regexData = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        const match = data.match(regexData);

        if (!match) return false;

        let dia = parseInt(match[1], 10);
        let mes = parseInt(match[2], 10) - 1; // Meses no JS são base 0
        let ano = parseInt(match[3], 10);
        let dataObj = new Date(ano, mes, dia);
        let hoje = new Date();
        let idade = hoje.getFullYear() - ano;

        return (
            dataObj.getDate() === dia &&
            dataObj.getMonth() === mes &&
            dataObj.getFullYear() === ano &&
            idade >= 0 && idade <= 130 // Idade entre 0 e 130 anos
        );
    }

    // Método para validar E-mail
    _validarEmail(email) {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regexEmail.test(email);
    }

    // Método para exibir os dados do registro
    exibirRegistro() {
        return `Nome: ${this.nome}, Data de Nascimento: ${this.data_nasc}, E-mail: ${this.email}`;

    }
}