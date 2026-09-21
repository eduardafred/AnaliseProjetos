interface ItemPedido {
    nome: string;
    preco: number;
}

class Pedido {
    public id: string = "";
    public itens: ItemPedido[] = [];
    public enderecoEntrega: string = "";
    public desconto: number = 0;
    public metodoPagamento: string = "";
    public status: string = "Pendente";

    public calcularTotal(): number {
        const subtotal = this.itens.reduce((acc, item) => acc + item.preco, 0);
        return Math.max(0, subtotal - this.desconto);
    }
}

interface IPedidoBuilder {
    definirId(id: string): this;
    adicionarItem(nome: string, preco: number): this;
    definirEndereco(endereco: string): this;
    aplicarDesconto(valor: number): this;
    definirMetodoPagamento(metodo: string): this;
    construir(): Pedido;
}

class PedidoBuilder implements IPedidoBuilder {
    private pedido: Pedido;

    constructor() {
        this.pedido = new Pedido();
    }

    public definirId(id: string): this {
        this.pedido.id = id;
        return this;
    }

    public adicionarItem(nome: string, preco: number): this {
        this.pedido.itens.push({ nome, preco });
        return this;
    }

    public definirEndereco(endereco: string): this {
        this.pedido.enderecoEntrega = endereco;
        return this;
    }

    public aplicarDesconto(valor: number): this {
        this.pedido.desconto = valor;
        return this;
    }

    public definirMetodoPagamento(metodo: string): this {
        this.pedido.metodoPagamento = metodo;
        return this;
    }

    public construir(): Pedido {
        const resultado = this.pedido;
        this.pedido = new Pedido(); 
        return resultado;
    }
}