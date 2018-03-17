const serve = require('serve');
const path = require('path');

const server = serve(path.join(__dirname, '/build'), {
  port: 3000,
  ignore: ['node_modules'],
});
