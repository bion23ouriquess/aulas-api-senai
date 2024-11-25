import cors from 'cors';
import express from 'express';
import UsuariosController from './controllers/UsuariosController.js';
import ClientesController from './controllers/ClientesController.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

//rotas de /usuarios

const _usuariosController = new UsuariosController();
const listaUsuarios = [];

app.get('/usuarios', _usuariosController.listar);
app.post('/usuarios', _usuariosController.adicionar);
app.put('/usuarios', _usuariosController.atualizar);
app.delete('/usuarios/:id', _usuariosController.excluir);


// rotas de /clientes

const clientesController = new ClientesController();
const listaClientes = [];

app.get('/clientes', clientesController.listarClientes);
app.post('/clientes', clientesController.adicionarCliente);
app.put('/clientes', clientesController.atualizarCliente);
app.delete('/clientes/:id', clientesController.excluirCliente);

const port = 3000;
app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
});