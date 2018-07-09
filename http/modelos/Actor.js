module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('actores', {
        nombre: Sequelize.STRING,
        apellidos: Sequelize.STRING,
        biblio: Sequelize.TEXT,
    },{
    	name : {
    		singular: 'actor',
    		plural: 'actores'
        }
	})

