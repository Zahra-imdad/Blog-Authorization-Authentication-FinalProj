const express = require("express");
const router = express.Router();

const blogController = require('../controller/blogsController');





//========================= BLOGS

router.get('/get_all_blogs',blogController.getAllBlogs)
router.get('/current_user_blogs/:id?',blogController.currentUserBlogs) 
router.get('/get_blogs/:id',blogController.specificBlog) 
router.post("/add_blog",blogController.addBlog)
router.delete('/delete_blog/:id?',blogController.deleteBlog)
router.put('/update_blog/:id?',blogController.updateBlog)

//========================= COMMENTS

router.get('/current_blogs_comments/:id?',blogController.getAllComments)
router.put('/update_comment/:id?',blogController.updateComment)

module.exports = router;