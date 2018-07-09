module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('peliculas', {
        nombre: Sequelize.STRING,
        historia: Sequelize.TEXT,
        videoPath: Sequelize.STRING,
        videoId: Sequelize.STRING
    },{
    	name : {
    		singular: 'pelicula',
    		plural: 'peliculas'
        }
	})

