interface IObservadorPedido {
    atualizar(pedidoId: string, novoStatus: string): void;
}

class ServicoEmailNotificacao implements IObservadorPedido {
    public atualizar(pedidoId: string, novoStatus: string): void {
        console.log(`  -> [Email] Pedido ${pedidoId} alterado para status: '${novoStatus}'. Notification enviada ao cliente.`);
    }
}

class ServicoEstoque implements IObservadorPedido {
    public atualizar(pedidoId: string, novoStatus: string): void {
        if (novoStatus === "Pago") {
            console.log(`  -> [Estoque] Pedido ${pedidoId} confirmado. Reservando itens no estoque.`);
        }
    }
}

class GerenciadorPedidoSubject {
    private observadores: IObservadorPedido[] = [];

    public adicionarObservador(obs: IObservadorPedido): void {
        this.observadores.push(obs);
    }

    public removerObservador(obs: IObservadorPedido): void {
        const idx = this.observadores.indexOf(obs);
        if (idx !== -1) {
            this.observadores.splice(idx, 1);
        }
    }

    public atualizarStatus(pedido: Pedido, novoStatus: string): void {
        pedido.status = novoStatus;
        console.log(`\n[Status Pedido ${pedido.id}] Alterado para: '${novoStatus}'`);
        this.notificar(pedido.id, novoStatus);
    }

    private notificar(pedidoId: string, novoStatus: string): void {
        for (const obs of this.observadores) {
            obs.atualizar(pedidoId, novoStatus);
        }
    }
}