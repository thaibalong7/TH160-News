'use strict'
module.exports = (sequelize, Sequelize) => {
    var editors = sequelize.define('editors', {
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
            tableName: 'editors',
            timestamps: false
        });
    editors.associate = (models) => {
        editors.hasMany(models.sub_categories_editor, { foreignKey: 'fk_editor' })
    }
    return editors;
}