'use strict'

module.exports = (sequelize, DataType) => {
    const cateogy = sequelize.define("category", {
        cat : DataType.STRING
    })
return cateogy
}

