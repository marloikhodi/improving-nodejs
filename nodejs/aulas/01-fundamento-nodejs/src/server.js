import http from "node:http"; //"node:" informa que o pacote é nativo do node

// - HTTP
//   - Método HTTP
//   - URL

// métodos principais:
// GET, POST, PUT, PATCH, DELETE
// São utilizado de maneira semântica e não funcional (significado)

// GET /users => Buscando um usuário no backend
// POST /users => Criando um usuário no backend

// Stateful = dados armazenado em memoria no node
// Stateless = dados armazenador em terceiro (banco de dados)

// Cabeçalhos (req,res) => Metadados (não necessariamente informações)
const users = [];

const server = http.createServer((req, res) => {
  // request e response
  const { method, url } = req; // métodos sendo GET, POST, etc... & url sendo o caminho da requisiçao (/users por exemplo)

  if (method === "GET" && url === "/users") {
    return res.setHeader("Content-type", "application/json").end(JSON.stringify(users)); //o return deve ser em JSON principalmente
  }
  if (method === "POST" && url === "/users") {
    users.push({
      id: users.length + 1,
      nome: "John Doe",
      email: "johndoe@example.com",
    });

    return res.end("Criação de usuário");
  }

  // console.log(method, url);
  return res.end("Hello World");
});

server.listen(3333);

// localhost:3333
