var route = require('express').Router();
var x = require('../controladores/Produccion');

route.route('/data/produccion')
        .get(x.read)
        .post(x.create);

route.route('/data/produccion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);
route.route('/data/produccion/imagenes/:idProduccion')
        .get(x.obtenerImagenes)
        .post(x.agregarImagen);
module.exports = route;

