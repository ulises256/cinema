const db = require('../relaciones');
var { pelicula } = db;
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
const formidable = require('formidable');
var multer = require('multer');
const path = require('path');
var _ = require('lodash');
const uploadDir = path.join(__dirname, '/..', '/..', '/aplicacion/dist/assets/videos/');
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

guardarvideo = function (uri, idTour, uris) {
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
        if (error) {
            console.log(error);
        } else {
            let video = {
                nombre: body.name,
                historia: body.description,
                uri: body.uri,
                link: body.link,
                iframe: 'https://player.vimeo.com' + uris
            }
            pelicula.create(video).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err)
            });
        }
    });
}


ex.create = function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;
    form.parse(req, (err, fields, files) => {
        if (err) { return res.status(500).json({ error: err }) }
        else {
            clientevimeo.upload(
                files.file_video.path,
                {
                    "name": fields.nombre,
                    "description": fields.historia,
                },
                function (uri) {
                    uris = _.replace(uri, 's', '');
                    console.log('File upload completed. Your Vimeo URI is:', uri)
                    res.status(200).json({ uploaded: uris });
                    guardarvideo(uri, fields.id_tours, uris);
                },
                function (bytesUploaded, bytesTotal) {
                    var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
                    console.log(bytesUploaded, bytesTotal, percentage + '%')
                    porcentaje = percentage;

                },
                function (error) {
                    console.log(error)
                    return res.status(500).json({ error: err })
                }
            );
        }
    });

    const archivo = () => {
        return new Promise((resolve, reject) => {
            form.on('fileBegin', function (name, file) {
                const [fileName, fileExt] = file.name.split('.');
                file.path = path.join(uploadDir, `${fileName}_${new Date().getTime()}.${fileExt}`);
                resolve(file.path)
            })
        })
    }

}

ex.read = function (req, res, next) {
    var idVmeo = req.params.idVmeo;

}

ex.update = function (req, res, next) {
    var idVmeo = req.params.idVmeo;
    var opinion = req.body;

}


ex.delete = function (req, res, next) {
    var idVmeo = req.params.idVmeo;

}


ex.picturesVideosOftour = function (req, res, next) {
    var idVideo = req.params.idVideo;
    videos.findById(idVideo).then(result => {

        clientevimeo.request(/*options*/{
            // This is the path for the videos contained within the staff picks
            // channels
            path: result.uri + '/pictures',
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