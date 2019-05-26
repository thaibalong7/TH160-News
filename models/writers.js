'use strict'
module.exports = (sequelize, Sequelize) => {
    var writers = sequelize.define('writers', {
        id: {
            primaryKey: true,
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pseudonym: {
            type: Sequelize.STRING,
            allowNull: false
        },
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'writers',
            timestamps: false
        });
        writers.associate = (models) =>{
            writers.hasMany(models.news, { foreignKey: 'fk_writer' })
        }
    return writers;
}