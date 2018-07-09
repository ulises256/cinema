const db = require('../relaciones');
var { reparto, actor , imagen} = db;

var ex = module.exports = {};

ex.create = (req, res, next) => reparto.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => reparto.findById(req.params.id)
    .then(reparto => reparto.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => reparto.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => req.params.id ?
    reparto.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    reparto.findAll()
    .then(response => res.status(200).jsonp(response));

ex.obtenerActores = (req, res, next) => reparto.findById(req.params.idReparto)
    .then(reparto => reparto ?  reparto.getActores(): null)
    .then(response => res.status(200).jsonp(response));

ex.agregarActores = (req, res, next) => reparto.findById(req.params.idReparto)
    .then(repart => repart ?
        imagen.create(req.body.imagen)
        .then(imagen => imagen.createActor(req.body))
        .then(actor => {
            repart.addActores(actor)
            return actor;
        }): null
    )
    .then(response => res.status(200).jsonp(response));