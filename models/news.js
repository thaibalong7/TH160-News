'use strict'
module.exports = (sequelize, Sequelize) => {
    var news = sequelize.define('news', {
        id: {
            primaryKey: true,
            type: Sequelize.TEXT
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        abstract: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        avatar: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('draft', 'approved', 'rejected', 'published')
        },
        publicAt: {
            type: Sequelize.TIME,
            allowNull: true
        },
        view: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'news',
            timestamps: true
        });

    news.associate = (models) => {
        news.hasMany(models.comments, { foreignKey: 'fk_new' });
        news.hasMany(models.tags_new, { foreignKey: 'fk_new' });
        news.belongsTo(models.writers, { foreignKey: 'fk_writer' });
        news.belongsTo(models.sub_categories, { foreignKey: 'fk_sub_category' });
    }
    return news;
}