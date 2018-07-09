module.exports = ({ Sequelize, sequelize } = conector) =>
    sequelize.define('imagenes', {
        imagen: {
            type: Sequelize.BLOB('medium'),
            get() {
                if (this.getDataValue('imagen'))
                    return new Buffer(this.getDataValue('imagen')).toString('ascii')
                else
                    return null
            }
        }
    }, {
            name: {
                singular: 'imagen',
                plural: 'imagenes'
            }
        })

