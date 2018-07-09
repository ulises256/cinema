var mysql = require('mysql');
var Sequelize = require('sequelize');

/**
 * Base de datos de google cloud
 * Esta es la base de datos principal, tened cuidado papus
 */

var sequelize = new Sequelize('cineclub', 'root', 'qwertyuiop', {
    host: '35.227.67.2',
    dialect: 'mysql',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

/**
 * Base de datos de heroku
 */

//mysql://b90f59b79213d1:ee0cafe6@us-cdbr-iron-east-04.cleardb.net/heroku_10a170faf22acd3?reconnect=true
// var sequelize = new Sequelize('heroku_10a170faf22acd3', 'b90f59b79213d1', 'ee0cafe6', {
//     host: 'us-cdbr-iron-east-04.cleardb.net',
//     dialect: 'mysql',
//     port: '3306',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

/**
 * Base de datos local
 */

//  var sequelize = new Sequelize('cineclub', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3306',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

sequelize.sync()
.then(() =>  console.log('Connecion realizada'))
.catch(err =>  console.log('No se puede conectar a la bd:', err))

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
