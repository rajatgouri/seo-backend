'use strict'

module.exports = (sequelize, DataType) => {
    const cateogy = sequelize.define("category", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        cat :{
            type : DataType.STRING,
            allowNull: false,
        }
    })
return cateogy
}

