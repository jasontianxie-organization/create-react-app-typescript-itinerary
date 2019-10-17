const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/public',
    proxy({
      target: 'http://129.28.183.129:3333',
      changeOrigin: true,
    })
  );
};