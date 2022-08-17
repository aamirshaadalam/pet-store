const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./api/db.json');
const middlewares = jsonServer.defaults();
const portNumber = 3001;

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    '/v1/pets?start=:start&limit=:limit': '/v1/pets?_start=:start&_limit=:limit',
  })
);
server.use('/v1', router);

server.listen(portNumber, () => {
  console.log(`JSON Server is running at port ${portNumber}`);
});
