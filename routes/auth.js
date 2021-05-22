const router = require('express').Router();
const auth = require('../controllers/auth');

const db = require('../models');

const _cat = db.category



router.post('/signup', auth.signup)

router.post('/login', auth.login);

router.post('/category', auth.category)

router.delete('/all-cat-del/:id', auth.catDel)

router.get('/all-cat', async (req, res) => {
  try {
    const cat = await _cat.findAll()
    return res.status(200).json({ status: 'ok', data: cat })
  } catch (error) {
    res.status(404).json({ status: 'error', error: 'Error' })
  }
})


router.get('/dash', auth.dashboard)

router.post('/blog', auth.blog)

router.get('/blogShow', auth.blogShow)

module.exports = {
  router: router,
  basePath: '/api/auth'
};
