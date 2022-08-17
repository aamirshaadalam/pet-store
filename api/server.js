const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('test.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.use(
  jsonServer.rewriter({
    '/v1/pets?start=:start&limit=:limit': '/v1/pets?_start=:start&_limit=:limit',
  })
);
server.use('/v1', router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
