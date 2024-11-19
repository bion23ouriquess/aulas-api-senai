import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

//rotas de /usuarios

const listaUsuarios = [];

app.get('/usuarios', (req, res) => {
    res.send(listaUsuarios);
});
app.post('/usuarios', (req, res) => {
    listaUsuarios.push(req.body)
    res.send(listaUsuarios);
});
app.put('/usuarios', (req, res) => {
    res.send('Chamou o PUT!');
});
app.delete('/usuarios', (req, res) => {
    res.send('Chamou o DELETE!');
});


// rotas de clientes 

const listaClientes = [];

app.get('/clientes', (req, res) => {
    res.send(listaClientes);
});
app.post('/clientes', (req, res) => {
    listaClientes.push(req.body)
    res.send(listaClientes);
});


const port = 3000;
app.listen(port, () => {
    console.log(`API está rodando na porta ${port}`);
});