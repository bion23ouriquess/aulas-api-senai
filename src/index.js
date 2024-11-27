import cors from "cors";
import express from "express";
import UsuariosController from "./controllers/UsuariosController.js";
import AutenticacaoController from "./controllers/AutenticacaoController.js";
import ClientesController from "./controllers/ClientesController.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const _autenticacaoController = new AutenticacaoController();
const _usuariosController = new UsuariosController();


//rotas públicas
app.post("/login", _autenticacaoController.login);
app.post("/usuarios", _usuariosController.adicionar);

//Midleware de verificação de usuário logado.
app.use((req, resp, next) => {
  console.log("Passei aqui...");
  if (!usuarioLogado) {
    resp.status(401).send();
    return;
  }
  next();
});

//rotas privadas
app.get("/usuarios", _usuariosController.listar);
app.put("/usuarios", _usuariosController.atualizar);
app.delete("/usuarios/:id", _usuariosController.excluir);

const port = 3000;
app.listen(port, () => {
  console.log(`API está rodando na porta ${port}`);
});
