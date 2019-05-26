'use strict'
module.exports = (sequelize, Sequelize) => {
    var comments = sequelize.define('comments', {
        id: {
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: false
        }
    },
        {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
            tableName: 'comments',
            timestamps: true
        });
        comments.associate = (models) =>{
            comments.belongsTo(models.news, { foreignKey: 'fk_new' })
        }
    return comments;
}