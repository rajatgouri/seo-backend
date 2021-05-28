const router = require('express').Router();
const blogsController = require('../controllers/blogs');


const { auth } = require('../middleware/auth');

router.route('/deleteById/:id').delete(auth, blogsController.blogDelete);
router.route('/blog').post(auth, blogsController.blog);
router.route('/getBlogs').get(blogsController.blogShow);
router.route('/getBlogs').post(auth, blogsController.blogShow);
router.route('/updateBlog/:id').put(auth, blogsController.updateBlog)
router.route('/getById/:id').get(blogsController.getBlogByID)

module.exports = {
  router: router,
  basePath: '/api/blogs'
};
