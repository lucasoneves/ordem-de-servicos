import http from 'http';

const PORT = 3000;

const rotas = {
  "/": "Node.js Curso",
  "/list-os": "Entrei na rota OS's",
  "/customers": "Entrei na rota customers"
}

const server = http.createServer((req, res) => {
  res.writeHead(200), {
    "Content-Type": "text/plain"
  };
  res.end(rotas[req.url]);
})

server.listen(PORT, (err, res) => {
  console.log("Server listening on port", PORT)
})