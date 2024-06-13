import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200), {
    "Content-Type": "text/plain"
  };
  res.end("Hello Node Server");
})

server.listen(PORT, (err, res) => {
  console.log("Server listening on port", PORT)
})