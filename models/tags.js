'use strict'
module.exports = (sequelize, Sequelize) => {
    var tags = sequelize.define('tags', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'tags',
            timestamps: false
        });
        tags.associate = (models) =>{
            tags.hasMany(models.tags_new, { foreignKey: 'fk_tag' })
        }
    return tags;
}