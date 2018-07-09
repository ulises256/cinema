module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('producciones', {
        nombre: Sequelize.STRING
    },{
    	name : {
    		singular: 'produccion',
    		plural: 'producciones'
        }
	})

