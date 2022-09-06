const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const blogController = require('../controller/blogsController');


const authMiddleWare = (req , res , next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.header('Authorization') || '';
  if (!token) {
      return res.status(401).json({ message: 'Unauthorized access' });
  }
  const decode = jwt.decode(token, secretKey);
  if (!decode) {
      return res.status(401).json({ message: 'Unauthorized access' });
  }
  req.user = decode;
  console.log("DECODE :",req.user)
  next();
}


//========================= BLOGS

router.get('/get_all_blogs',authMiddleWare,blogController.getAllBlogs)
router.get('/current_user_blogs/:id?',authMiddleWare,blogController.currentUserBlogs) 
router.get('/get_blogs/:id',blogController.specificBlog) 
router.post("/add_blog",authMiddleWare,blogController.addBlog)
router.delete('/delete_blog/:id?',authMiddleWare,blogController.deleteBlog)
router.put('/update_blog/:id?',authMiddleWare,blogController.updateBlog)

//========================= COMMENTS

router.get('/current_blogs_comments/:id?',blogController.getAllComments)
router.put('/update_comment/:id?',authMiddleWare,blogController.updateComment)

module.exports = router;