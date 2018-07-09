
//*-*-*-CONEXION CON SEQUELIZE & MYSQL-*-*-*-*-*-*-*
var conector = require('./connection');

//- Modelos

var usuario = require('./modelos/Usuario')(conector);
var pelicula  = require('./modelos/Pelicula')(conector);
var imagen  = require('./modelos/Imagen')(conector);
var noticia  = require('./modelos/Noticia')(conector);
var actor  = require('./modelos/Actor')(conector);
var portada  = require('./modelos/Portada')(conector);
var reparto  = require('./modelos/Reparto')(conector);
var produccion  = require('./modelos/Produccion')(conector)
var avatar = require('./modelos/Avatar')(conector);
//- Relations

pelicula.hasMany(portada, {as:'Portadas', foreignKey: 'id_pelicula', onDelete: 'CASCADE'})
portada.belongsTo(portada, {as:'Pelicula', foreignKey: 'id_pelicula'})

pelicula.hasOne(reparto, {as: 'Reparto', foreignKey: 'id_pelicula', onDelete: 'CASCADE'})
reparto.belongsTo(pelicula, {as: 'Pelicula', foreignKey: 'id_pelicula', onDelete: 'CASCADE'})

pelicula.hasOne(produccion, {as: 'Produccion', foreignKey: 'id_pelicula', onDelete: 'CASCADE'})
produccion.belongsTo(pelicula, {as: 'Pelicula', foreignKey: 'id_pelicula'})

reparto.hasMany(actor, {as: 'Actores', foreignKey: 'id_reparto', onDelete: 'CASCADE'})
actor.belongsTo(reparto, {as: 'Reparto', foreignKey: 'id_reparto', onDelete: 'CASCADE'})

imagen.hasOne(actor, {as: 'Actor', foreignKey: 'id_imagen'})
actor.belongsTo(imagen, {as: 'Imagen', foreignKey: 'id_imagen'})

produccion.belongsToMany(imagen, {as: 'Imagenes',  through: 'produccion_imagenes',foreignKey: 'id_produccion', onDelete: 'CASCADE'})
imagen.belongsToMany(produccion, {as: 'Producciones', through: 'produccion_imagenes',foreignKey: 'id_imagen', onDelete: 'CASCADE'})

noticia.belongsToMany(imagen, {as: 'Imagenes',  through: 'noticia_imagenes',foreignKey: 'id_noticia', onDelete: 'CASCADE'})
imagen.belongsToMany(noticia, {as: 'Noticias',  through: 'noticia_imagenes',foreignKey: 'id_imagen', onDelete: 'CASCADE'})

avatar.belongsTo(usuario , {as: 'Usuario', foreignKey: 'id_usuario'});
usuario.hasOne(avatar , {as:'Avatar', foreignKey: 'id_usuario', onDelete: 'CASCADE'});

// servicios.hasMany(imagenes, {foreignKey: 'IdServicio'});
// imagenes.belongsTo(servicios, {foreignKey: 'IdServicio'});
//
// foto.belongsTo(abogados, {foreignKey: 'IdAbogado'});
// abogados.hasOne(foto, {foreignKey: 'IdAbogado'});


module.exports.usuario = usuario;
module.exports.pelicula = pelicula;
module.exports.imagen = imagen;
module.exports.noticia = noticia;
module.exports.actor = actor;
module.exports.portada = portada;
module.exports.reparto = reparto;
module.exports.noticia = noticia;
module.exports.produccion = produccion;
module.exports.avatar = avatar;
