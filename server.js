import app from './src/app.js';

const PORT = 3000;

const rotas = {
  "/": "Node.js Curso",
  "/list-os": "Entrei na rota OS's",
  "/customers": "Entrei na rota customers"
}

app.listen(PORT, () => {
  console.log("Server listening on port", PORT)
})