'use strict';

// const { Model } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init({
//     Name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     // roll : DataTypes.STRING,
//     // phone: DataTypes.INTEGER

//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };



module.exports = (sequelize,DataType) =>{
  const User = sequelize.define("user",{
    fullName: DataType.STRING,
    email : DataType.STRING,
    password : DataType.STRING,
  })
  return User
}

