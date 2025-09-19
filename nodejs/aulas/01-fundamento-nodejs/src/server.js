import http from "node:http";

const server = http.createServer((req, res) => {
  // request e response
  return res.end("Hello World");
});

server.listen(3333);

// localhost:3333
