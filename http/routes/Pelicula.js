var route = require('express').Router();
var x = require('../controladores/Pelicula');

route.route('/data/pelicula')
        .get(x.read)
        .post(x.create);

route.route('/data/pelicula/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);
route.route('/data/pelicula/portada/:idPeli')
        .get(x.portadas)
        .post(x.agregarPortada);
route.route('/data/pelicula/reparto/:idPeli')
        .get(x.reparto)
route.route('/data/pelicula/produccion/:idPeli')
        .get(x.reparto)

module.exports = route;

