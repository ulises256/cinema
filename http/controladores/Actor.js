const db = require('../relaciones');
var { actor } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => actor.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => actor.findById(req.params.id)
    .then(actor => actor.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => actor.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => req.params.id ?
    actor.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    actor.findAll()
    .then(response => res.status(200).jsonp(response));
