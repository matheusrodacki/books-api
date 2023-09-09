//Server sem o Express:

//import http from "http";

//const PORT = 4000;
//
//const rotas = {
//    "/": "Curso de Node.JS",
//    "/teste" : "Teste OK! OK!",
//    "/livros": "List Books",
//    "/users": "List of Users!"
// }
//
//const server = http.createServer((req, res) => {
//    res.writeHead(200, { "Content-Type": "text/json"} );
//    res.end(rotas[req.url]);
//});
//
//server.listen(PORT, () => {
//    console.log("Servidor escutando!")
//})

//Server com o Express:

import "dotenv/config";
import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor escutando!");
});
