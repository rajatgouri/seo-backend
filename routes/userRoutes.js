const router = require('express').Router();
const db = require('../models')

const Cat = db.category




module.exports = {
  router: router,
  basePath: '/api/auth'
};
