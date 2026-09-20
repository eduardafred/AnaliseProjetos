interface ICalculadorFrete {
    calcular(cepDestino: string, pesoKg: number): number;
}

class ServicoCorreiosLegado {
    public obterTarifaPorPesoECep(cep: string, pesoGramas: number): number {
        return Math.round((pesoGramas / 1000) * 1500);
    }
}

class CorreiosAdapter implements ICalculadorFrete {
    private servicoLegado: ServicoCorreiosLegado;

    constructor(servicoLegado: ServicoCorreiosLegado) {
        this.servicoLegado = servicoLegado;
    }

    public calcular(cepDestino: string, pesoKg: number): number {
        const pesoGramas = pesoKg * 1000;
        const tarifaCentavos = this.servicoLegado.obterTarifaPorPesoECep(cepDestino, pesoGramas);
        return tarifaCentavos / 100; 
    }
}