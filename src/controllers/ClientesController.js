import ConexaoMySql from "../database/ConexaoMySql.js";

class ClientesController {
  async adicionarCliente(req, resp) {
    try {
      const novoCliente = req.body;

      if (!novoCliente.nome || !novoCliente.email || !novoCliente.cpf) {
        resp.status(400).send("Os campos nome, e-mail e CPF são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO clientes (nome, email, cpf) VALUES (?, ?, ?)";

      const [resultado] = await conexao.execute(comandoSql, [
        novoCliente.nome,
        novoCliente.email,
        novoCliente.cpf,
      ]);

      resp.send(resultado);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        resp.status(400).send("CPF já cadastrado.");
        return;
      }
      resp.status(500).send(error);
    }
  }

  async listarClientes(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = " SELECT * FROM clientes WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";
      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
      resp.send(
        resultado.map((u) => {
          delete u.cpf;
          return u;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async atualizarCliente(req, resp) {
    try {
      const clienteEditar = req.body;

      if (!clienteEditar.id || !clienteEditar.nome || !clienteEditar.email) {
        resp.status(400).send("Os campos id, nome e email são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?";

      const [resultado] = await conexao.execute(comandoSql, [
        clienteEditar.nome,
        clienteEditar.email,
        clienteEditar.telefone,
        clienteEditar.id,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluirCliente(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();

      const comandoSql = "DELETE FROM clientes WHERE id = ?";
      const [resultado] = await conexao.execute(comandoSql, [+req.params.id]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ClientesController;
