'use strict'
module.exports = (sequelize, Sequelize) => {
    var tags_new = sequelize.define('tags_new', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'tags_new',
            timestamps: false
        });
        tags_new.associate = (models) =>{
            tags_new.belongsTo(models.tags, { foreignKey: 'fk_tag' });
            tags_new.belongsTo(models.news, { foreignKey: 'fk_new' });
        }
    return tags_new;
}