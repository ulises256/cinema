const db = require('../relaciones');
var { portada } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => portada.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => portada.findById(req.params.id)
    .then(portada => portada.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => portada.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => req.params.id ?
    portada.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    portada.findAll()
    .then(response => res.status(200).jsonp(response));
