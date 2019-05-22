class View {
    constructor(elemento) {
        this._elemento = elemento;
    }

    template() {
        throw Error('O metodo template tem que ser implementado');
    }
    
    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}