import http from "http";

const PORT = 3000;

const rotas = {
    "/": "Curso de Node.JS",
    "/teste" : "Teste OK! OK!",
    "/livros": "List Books"
 }

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plan"} );
    res.end(rotas[req.url]);
});

server.listen(PORT, () => {
    console.log("Servidor escutando!")
})