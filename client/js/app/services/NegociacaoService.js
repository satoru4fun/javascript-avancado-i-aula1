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

    cadastra(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(conexao => {
                new NegociacaoDao(conexao)
                    .adiciona(negociacao)
                    .then(() => 'Negociacao adicionada com sucesso')
                    .catch(erro => {
                        throw new Error('Nao foi possivel');
                    });
            });
    }

    apagaTodos() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociacoes apagadas!')
            .catch(erro => {
                console.log(erro);
                throw new Error('Nao foi possivel apagar');
            });
    }

    importa(listaAtual) {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()])
            /* .then(negociacoes => {
                negociacoes
                    .reduce((arrayAchatada, array) => arrayAchatada.concat(array), [])
                    .filter(negociacao => {
                        !this._listaNegociacoes.negociacoes.some(negociacaoExistente =>
                            JSON.stringify(negociacaoExistente) == JSON.stringify(negociacao))
                    })
            }) */
            .then(negociacoes => {
                return negociacoes
                    .reduce((arrayAchatada, array) => arrayAchatada.concat(array), []);
            }).catch(erro => {
                console.log(erro);
                throw new Error('Nao foi possivel importar');
            });
    }

}