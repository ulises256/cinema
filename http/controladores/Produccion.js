const db = require('../relaciones');
var { produccion, imagen } = db;

var ex = module.exports = {};

ex.create = (req, res, next) => produccion.create(req.body)
    .then(response => res.status(200).jsonp(response));

ex.delete = (req, res, next) => produccion.findById(req.params.id)
    .then(produccion => produccion.destroy())
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => produccion.update(req.body, { where: { id: req.params.id } } )
    .then(response => res.status(200).jsonp(response));

ex.read =  (req, res, next) => req.params.id ?
    produccion.findById(req.params.id)
    .then(response => res.status(200).jsonp(response))
    :
    produccion.findAll()
    .then(response => res.status(200).jsonp(response));

ex.obtenerImagenes = (req, res, next) => produccion.findById(req.params.idProduccion)
    .then(produccion => produccion.getImagenes() )
    .then(response => res.status(200).jsonp(response));

ex.agregarImagen = (req, res, next) => produccion.findById(req.params.idProduccion)
    .then(produccions => produccions ? 
            imagen.create(req.body)
            .then(imagen => {
                produccions.addImagenes(imagen)
                return imagen;
            }) : false
    )
    .then(response => res.status(200).jsonp(response));