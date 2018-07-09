var route = require('express').Router();
var x = require('../controladores/Reparto');

route.route('/data/reparto')
        .get(x.read)
        .post(x.create);

route.route('/data/reparto/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

route.route('/data/reparto/actores/:idReparto')
        .get(x.obtenerActores)
        .post(x.agregarActores)

module.exports = route;

