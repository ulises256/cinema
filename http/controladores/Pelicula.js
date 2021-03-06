const db = require('../relaciones');
var { pelicula } = db;
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const formidable = require('formidable');
var multer = require('multer');
const path = require('path');
var _ = require('lodash');
const uploadDir = path.join(__dirname, '/..', '/..', '/peliculas');
// const uploadDir = path.join(__dirname, '/..', '/..', '/aplicacion/src/assets/videos/');
const vimeoAPI = require('../../conf/oauth').vimeo;
const Vimeo = require('vimeo').Vimeo;

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

const clientevimeo = new Vimeo(vimeoAPI.client_Identifier, vimeoAPI.client_secrets, vimeoAPI.access_token);

guardarvideo = function (uri, path) {
    clientevimeo.request(/*options*/{
        // This is the path for the videos contained within the staff picks
        // channels
        path: uri,
        // This adds the parameters to request page two, and 10 items per
        // page
        query: {
            fields: 'uri,name,description,duration,link'
        }
    }, function (error, body, status_code, headers) {
        console.log(body)
        uris = _.replace(uri, 's', '');
        if (error) {
            console.log(error);
        } else {
            let video = {
                nombre: body.name,
                historia: body.description,
                videoPath: path,
                uri: body.uri,
                link: body.link,
                iframe: 'https://player.vimeo.com' + uris
            }
            pelicula.create(video).then(async result => {
                result? await unlinkAsync(result.videoPath) : console.log('no se puedo eliminar')
            }).catch(err => {
                console.log('Salio un error al guardar', err)
                unlinkAsync(path)
            });
        }
    });
}


ex.create = function (req, res, next) {

    let video = {
        nombre: req.body.nombre,
        historia: req.body.historia,
        link: req.body.videoId,
        iframe: '//player.vimeo.com/video/' + req.body.videoId.substr(18),
        uri: '/videos/' + req.body.videoId.substr(18)
    }

    pelicula.create(video)
    .then(response => res.status(200).jsonp(response));

}


ex.picturesVideos = function (req, res, next) {
    videos.findById(req.params.idPelicula).then(peli => {

        clientevimeo.request(/*options*/{
            // This is the path for the videos contained within the staff picks
            // channels
            path: peli.uri + '/pictures',
            // This adds the parameters to request page two, and 10 items per
            // page

        }, function (error, body, status_code, headers) {
            if (error) {
                console.log(error);
            } else {
                body.data[0].sizes[6] ? (miniatura = body.data[0].sizes[6].link, res.status(200).jsonp(miniatura)) : console.log('Aun no hay miniatura')

            }
        });
    })
}








// ex.create = (req, res, next) => {
//     upload(req, res, function (err) {
//         if (err)
//             return res.status(500).jsonp({ err: 'Error al subir el video: ' + err });

//         pelicula.create(
//                 {
//                     nombre: req.body.nombre,
//                     historia: req.body.historia,
//                     videoPath: req.file ? req.file.path : null,
//                     videoId: req.file ? 'assets/videos/'+req.file.filename : null
//                 }
//             )
//             .then(peli =>{
//                  peli.createReparto({nombre: peli.nombre,id_peli: peli.id})
//                  peli.createProduccion({nombre: peli.nombre,id_peli: peli.id})
//                  return peli;
//             })
//             .then(response => res.status(200).jsonp(response))
//     });
// }

ex.delete = (req, res, next) => pelicula.findById(req.params.id)
    // .then(peli => {
    //     peli ?     clientevimeo.request(/*options*/{
    //         // This is the path for the videos contained within the staff picks
    //         // channels
    //         method: 'DELETE',
    //         path: peli.uri,
    //         // This adds the parameters to request page two, and 10 items per
    //         // page
    //         query: {
    //             fields: 'uri,name,description,duration,link'
    //         }
    //     }, function (error, body, status_code, headers) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //           return peli;
    //         }
    //     }) : null
    // })
    .then(pelicula => pelicula? pelicula.destroy() : console.log(pelicula))
    .then(response => res.status(200).jsonp(response));

ex.update = (req, res, next) =>{
       let video = {
        nombre: req.body.nombre,
        historia: req.body.historia,
        link: req.body.videoId,
        iframe: '//player.vimeo.com/video/' + req.body.videoId.substr(18),
        uri: '/videos/' + req.body.videoId.substr(18)
    }

    pelicula.update(video, { where: { id: req.params.id } }).then(response => res.status(200).jsonp(response));
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
    .then(response => res.status(200).jsonp(response));

ex.estrenos = (req, res, next) => pelicula.findAll({where: {estreno: "si"}})
    .then(response => res.status(200).jsonp(response));

ex.paginacion = function(req, res, next) {

    pelicula.findAndCountAll(
            {
                order:[
                    ['createdAt', 'DESC'],
                ],
            })
        .then(result=> {
            let response =  new Object(
                                {
                                    pagina:Math.round(result.count/req.params.Items),
                                    items: _.chunk(result.rows, req.params.Items)[req.params.Pagina],
                                    totalPaginas: _.chunk(result.rows, req.params.Items).length
                                });
            res.status(200).jsonp(response);
        })

};