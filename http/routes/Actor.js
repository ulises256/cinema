var route = require('express').Router();
var x = require('../controladores/Actor');

route.route('/data/actor')
        .get(x.read)
        .post(x.create);

route.route('/data/actor/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = route;

