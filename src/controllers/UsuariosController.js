import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
  async adicionar(req, resp) {
    try {
      const novoUsuario = req.body;

      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha) {
        resp
          .status(400)
          .send("Os campos nome, email e senha são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, md5(?))";

      const [resultado] = await conexao.execute(comandoSql, [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
      ]);

      resp.send(resultado);
    } catch (erro) {
      if (error.code === "ER_DUP_ENTRY") {
        resp.status(400).send("Email já cadastrado.");
        return;
      }
      resp.status(500).send(erro);
    }
  }

  async listar(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = " SELECT * FROM usuarios WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";
      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
      resp.send(
        resultado.map((u) => {
          delete u.senha;
          return u;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async atualizar(req, resp) {
    try {
      const usuarioEditar = req.body;

      if (!usuarioEditar.nome || !usuarioEditar.nome || !usuarioEditar.email) {
        resp.status(400).send("Os campos ID, nome e email são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "UPDATE usuarios SET nome = ?, email = ? WHERE id = ?";

      const [resultado] = await conexao.execute(comandoSql, [
        usuarioEditar.nome,
        usuarioEditar.email,
        usuarioEditar.foto || null,
        usuarioEditar.id,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluir(req, resp) {
    try {
      const idUsuario = req.params.id;

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "DELETE FROM usuarios WHERE id =?";

      const [resultado] = await conexao.execute(comandoSql, [idUsuario]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default UsuariosController;
