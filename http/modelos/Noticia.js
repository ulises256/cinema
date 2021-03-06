module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('noticias', {
        titulo: Sequelize.STRING,
        descripcion: Sequelize.TEXT('long'),
        status:  {
            type: Sequelize.ENUM,
            values: [ 'publico', 'sinpublicar' ],
            defaultValue: 'sinpublicar',
        }
    },{
    	name : {
    		singular: 'noticia',
    		plural: 'noticias'
        }
	})

