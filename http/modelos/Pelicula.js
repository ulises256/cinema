module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('peliculas', {
        nombre: Sequelize.STRING,
        historia: Sequelize.TEXT,
        videoPath: Sequelize.STRING,
        videoId: Sequelize.STRING,
        estreno: {
            type: Sequelize.ENUM,
            values: [ 'si', 'no' ],
            defaultValue: 'no',
        }
    },{
    	name : {
    		singular: 'pelicula',
    		plural: 'peliculas'
        }
	})

