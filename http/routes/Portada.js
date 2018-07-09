var route = require('express').Router();
var x = require('../controladores/Portada');

route.route('/data/portada')
        .get(x.read)
        .post(x.create);

route.route('/data/portada/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

