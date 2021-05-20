'use strict';

module.exports = (sequelize,DataType) =>{
  const category = sequelize.define("category",{
    cat : DataType.STRING,
  })
  return category
}
