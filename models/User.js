'use strict'
module.exports = (sequelize, DataType) => {
    const User = sequelize.define("user", {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fullName: {
            type :DataType.STRING,
            allowNull: false,
        },
        email:{
            type : DataType.STRING,
            allowNull : false
        },
        password: {
            type :DataType.STRING,
            allowNull : false
        },
    })
    return User
}

