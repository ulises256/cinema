var route = require('express').Router();
var x = require('../controladores/Noticia');

route.route('/data/noticia')
        .get(x.read)
        .post(x.create);

route.route('/data/noticia/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/noticia/front')
        .get(x.noticiasPublicas)
        .post(x.ultimaNoticia);

module.exports = route;

