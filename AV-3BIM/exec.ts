console.log(" BUILDER");

const builder = new PedidoBuilder();
const pedido01 = builder
    .definirId("PED-8801")
    .adicionarItem("Teclado Mecânico", 350.00)
    .adicionarItem("Mouse Gamer", 150.00)
    .definirEndereco("Av. Paulista, 1000 - São Paulo/SP")
    .aplicarDesconto(50.00)
    .definirMetodoPagamento("PIX")
    .construir();

console.log(`Pedido ${pedido01.id} criado com sucesso!`);
console.log(`Itens: ${pedido01.itens.map(i => i.nome).join(", ")}`);
console.log(`Total a Pagar: R$ ${pedido01.calcularTotal().toFixed(2)}`);


console.log("\n ADAPTER");

const correiosLegado = new ServicoCorreiosLegado();
const calculadorFrete: ICalculadorFrete = new CorreiosAdapter(correiosLegado);
const valorFrete = calculadorFrete.calcular("01310-100", 2.5);
console.log(`Frete calculado via Adapter: R$ ${valorFrete.toFixed(2)}`);


console.log("\n OBSERVER ");

const gerenciador = new GerenciadorPedidoSubject();
const emailService = new ServicoEmailNotificacao();
const estoqueService = new ServicoEstoque();

gerenciador.adicionarObservador(emailService);
gerenciador.adicionarObservador(estoqueService);

gerenciador.atualizarStatus(pedido01, "Pago");
gerenciador.atualizarStatus(pedido01, "Enviado");