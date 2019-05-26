'use strict'
module.exports = (sequelize, Sequelize) => {
    var sub_categories_editor = sequelize.define('sub_categories_editor', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'sub_categories_editor',
            timestamps: false
        });
    sub_categories_editor.associate = (models) => {
        sub_categories_editor.belongsTo(models.editors, { foreignKey: 'fk_editor' });
        sub_categories_editor.belongsTo(models.sub_categories, { foreignKey: 'fk_sub_category' });
    }
    return sub_categories_editor;
}