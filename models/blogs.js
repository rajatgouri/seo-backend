'use strict';



module.exports = (sequelize,DataType) =>{
  const Blog = sequelize.define("blog",{
    title: DataType.STRING,
    date : DataType.STRING,
    latest : DataType.BOOLEAN,
    tages: DataType.STRING,
    summary: DataType.STRING,
    YTLink : DataType.STRING,
    draft: DataType.BOOLEAN
  })
  return Blog
}
