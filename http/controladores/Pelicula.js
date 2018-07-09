const db = require('../relaciones');
var { pelicula } = db;
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var multer = require('multer');
const path = require('path');
const uploadDir = path.join(__dirname, '/..', '/..', '/aplicacion/dist/assets/videos/');
// const uploadDir = path.join(__dirname, '/..', '/..', '/aplicacion/src/assets/videos/');

var ex = module.exports = {};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        callback(null, req.body.nombre + '_' + Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage }).single('file_video');

ex.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err)
            return res.status(500).jsonp({ err: 'Error al subir el video: ' + err });

        pelicula.create(
                {
                    nombre: req.body.nombre,
                    historia: req.body.historia,
                    videoPath: req.file ? req.file.path : null,
                    videoId: req.file ? 'assets/videos/'+req.file.filename : null
                }
            )
            .then(peli =>{
                 peli.createReparto({nombre: peli.nombre,id_peli: peli.id})
                 peli.createProduccion({nombre: peli.nombre,id_peli: peli.id})
                 return peli;
            })
            .then(response => res.status(200).jsonp(response))
    });
}

ex.delete = (req, res, next) => pelicula.findById(req.params.id)
    .then(async pelicula => {
        await unlinkAsync(pelicula.videoPath)
        return await pelicula.destroy()
    })
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) => {
    upload(req, res, function (err) {
        if (req.file) {
            if (err)
                return res.status(500).jsonp({ err: 'Error al subir el video: ' + err });
            pelicula.findById(req.params.id)
                .then(async peli => {
                    await unlinkAsync(peli.videoPath)
                    await peli.update({ nombre: req.body.nombre, historia: req.body.historia, videoLink: req.file.path })
                        .then(response => res.status(200).jsonp(response))
                });
        } else {
            pelicula.update(req.body, { where: { id: req.params.id } })
                .then(response => res.status(200).jsonp(response));
        }
    });

}

ex.read = (req, res, next) => req.params.id ?
    pelicula.findById(req.params.id)
        .then(response => res.status(200).jsonp(response))
    :
    pelicula.findAll()
        .then(response => res.status(200).jsonp(response));

ex.portadas = (req, res, next) => pelicula.findById(req.params.idPeli)
    .then(peli => peli ? peli.getPortadas(): null)
    .then(response => res.status(200).jsonp(response))

ex.agregarPortada= (req, res, next) => pelicula.findById(req.params.idPeli)
    .then(peli => peli.createPortada(req.body))
    .then(response => res.status(200).jsonp(response))

ex.reparto = (req, res, next) => pelicula.findById(req.params.idPeli)
    .then(peli => peli?  peli.getReparto() : null)
    .then(response => res.status(200).jsonp(response))

ex.produccion = (req, res, next) => pelicula.findById(req.params.idPeli)
    .then(peli =>peli? peli.getProduccion() : null)
    .then(response => res.status(200).jsonp(response))