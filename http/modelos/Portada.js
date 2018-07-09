module.exports = ({Sequelize, sequelize } = conector) =>
    sequelize.define('portadas', {
        imagen: {
            type: Sequelize.BLOB('medium'),
            get() {
                if (this.getDataValue('imagen'))
                    return new Buffer(this.getDataValue('imagen')).toString('ascii')
                else
                    return null
            }
        }
    },{
    	name : {
    		singular: 'portada',
    		plural: 'portadas'
        }
	})

