public class Main {
    public static void main(String[] args) {
        ConexaoBanco conexao1 = ConexaoBanco.getInstance();
        ConexaoBanco conexao2 = ConexaoBanco.getInstance();

        conexao1.conectar();
        System.out.println(conexao1 == conexao2);
    }
}