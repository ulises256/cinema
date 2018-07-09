module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('repartos', {
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'reparto',
    		plural: 'repartos'
        }
	})

