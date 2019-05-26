'use strict'
module.exports = (sequelize, Sequelize) => {
    var subscribers = sequelize.define('subscribers', {
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
        birthdate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'subscribers',
            timestamps: false
        });
    return subscribers;
}