'use strict'

module.exports = (sequelize, DataType) => {
    const Blog = sequelize.define("blog", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
        },
        summary: {
            type: DataType.TEXT('long'),
            allowNull: false,
        },
        date: {
            type: DataType.STRING,
            allowNull: false,
        },
        draft: {
            type: DataType.BOOLEAN,
            default: false,
        },
        link: {
            type: DataType.STRING,
            allowNull: false,
        },
        tages: {
            type: DataType.STRING,
        }
    })
    return Blog
}

