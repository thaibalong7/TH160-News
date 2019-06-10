'use strict'
module.exports = (sequelize, Sequelize) => {
    var categories = sequelize.define('categories', {
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
            tableName: 'categories',
            timestamps: false,
            classMethods: {
                getAll: function(){
                    return this.findAll();
                }
            }
        });
    categories.associate = (models) => {
        categories.hasMany(models.sub_categories, { foreignKey: 'fk_category' })
    }
    return categories;
}