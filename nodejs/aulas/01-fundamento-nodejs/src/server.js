import http from "node:http"; //"node:" informa que o pacote é nativo do node

// - HTTP
//   - Método HTTP
//   - URL

// métodos principais:
// GET, POST, PUT, PATCH, DELETE
// São utilizado de maneira semântica e não funcional (significado)

// GET /users => Buscando um usuário no backend
// POST /users => Criando um usuário no backend

const server = http.createServer((req, res) => {
  // request e response
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res.end("Listagem de usuários");
  }
  if (method === "POST" && url === "/users") {
    return res.end("Criação de usuário");
  }

  // console.log(method, url);
  return res.end("Hello World");
});

server.listen(3333);

// localhost:3333
