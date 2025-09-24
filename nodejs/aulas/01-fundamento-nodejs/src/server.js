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

// HTTP Status Code
// Códigos númericos (semantica) para dizer ao front-end a situação da requisição(se deu erro, se está ok, se foi falta de info, etc)

const users = [];

const server = http.createServer(async (req, res) => {
  // request e response
  const { method, url } = req; // métodos sendo GET, POST, etc... & url sendo o caminho da requisiçao (/users por exemplo)
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
    //JSON.parse transforma em JSON ao enviar
  } catch {
    res.body = null
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users)); //o return deve ser em JSON principalmente
  }
  if (method === "POST" && url === "/users") {
    const { nome, email } = req.body

    users.push({
      id: users.length + 1,
      nome,
      email,
    });

    return res
      .writeHead(201)
      .end('Usuário Criado');
  }

  // console.log(method, url);
  return res
    .writeHead(404)
    .end("Not Found");
});

server.listen(3333);

// localhost:3333
