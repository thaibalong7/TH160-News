'use strict'
module.exports = (sequelize, Sequelize) => {
    var sub_categories = sequelize.define('sub_categories', {
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
            tableName: 'sub_categories',
            timestamps: false
        });
    sub_categories.associate = (models) => {
        sub_categories.hasMany(models.news, { foreignKey: 'fk_sub_category' });
        sub_categories.hasMany(models.sub_categories_editor, { foreignKey: 'fk_sub_category' });
        sub_categories.belongsTo(models.categories, { foreignKey: 'fk_category' });
    }
    return sub_categories;
}