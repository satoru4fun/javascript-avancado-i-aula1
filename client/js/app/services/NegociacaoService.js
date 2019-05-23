class NegociacaoService {

    constructor() {
        this.http = new HttpService();
    }

    obterNegociacoesDaSemana() {

        return this.http
                .get('negociacoes/semana')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    return new Error('Não foi possível obter as negociações da semana');
                });
    }
    
    obterNegociacoesDaSemanaAnterior() {

        return this.http
                .get('negociacoes/anterior')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    return new Error('Não foi possível obter as negociações da semana anterior');
                });
    }

    obterNegociacoesDaSemanaRetrasada() {

        return this.http
                .get('negociacoes/retrasada')
                .then(negociacoes => {
                    return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                })
                .catch(erro => {
                    console.log(erro);
                    return new Error('Não foi possível obter as negociações da semana retrasada');
                })
    }

}