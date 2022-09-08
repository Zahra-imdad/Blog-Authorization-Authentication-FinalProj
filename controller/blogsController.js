const Blog = require('../model/blogSchema')
const { addBlogValidation , updateBlogValidation} = require('../validations/blogValidations'); 

const getAllBlogs = async (req,res,next)=>{
    try{
        const blogPosts = await Blog.find({}).populate("authorDetail","-email -password")
        res.json({ blogPosts });
    }catch(err){
        next({status:500,message:err.message})
    }
};

const currentUserBlogs = async (req,res,next)=>{

    const id = req.user.id
    console.log(id)
    try{
      
        const blogPosts = await Blog.find({authorDetail: id}).populate("authorDetail","-email -password")
        res.json({ blogPosts });
    }catch(err){
        next({status:500,message:err.message})
    }
  }

const specificBlog = async (req,res,next)=>{
    try{
        const {id} =req.params
        const blogPosts = await Blog.find({_id: id}).populate("authorDetail","-email -password")
        res.json({ blogPosts });
    }catch(err){
        next({status:500,message:err.message})
    }
  }

  const addBlog = async (req, res, next) => {
    const { title, content,tags } = req.body;
     console.log(req.body);
     id = req.user.id
    try {
      const blogPost = await Blog.create({id, title, content,tags, authorDetail:id });
      console.log(blogPost);
      console.log("username",blogPost.authorDetail.username);
      res.json({ blogPost });
      res.status(201).json({
        message: "Added blog",
        blogPost,
      });
    } catch (e) {
      next({ status: 500, message: e.message });
    }
  };

  const deleteBlog = async (req,res,next)=>{
    const {id}  =req.params
    console.log("backend  :",id)
    if(!id){
      return next({status:404, message:"Id missing"})
    }
    try{
      await Blog.findByIdAndDelete( id);
      res.json({message:"Deleted "+id})
    }catch(e){
      next({status:500,message:e.message})
    }
  }

  const updateBlog = async(req,res,next)=>{
    const {id} = req.params
    console.log("update id : ", id)
    if(!id){
      return next({status:404, message:"Id missing"})
    }
    try{
      await Blog.findByIdAndUpdate( id , {$set: {title: req.body.title, content: req.body.content,tags:req.body.tags}});
      res.json({message:"Updated : "+id})
    }catch(e){
      next({status:500,message:e.message})
    }
  };

  const getAllComments = async (req,res,next)=>{
    const {id} = req.params
    console.log(id)
    try{    
        const blogPosts = await Blog.find({_id: id}).populate("comments","-id -postedAt")
        res.json({ blogPosts });
    }catch(err){
        next({status:500,message:err.message})
    }
  }

  const updateComment = async(req,res,next)=>{
    const {id} = req.params
    const comment = req.body.comment
    const userName = req.user.username;
    console.log("user:",req.user.username);
    const userId = req.body.userId 
    console.log("Comment:",comment)
    console.log("update id : ", id)
    if(!id){
      return next({status:404, message:"Id missing"})
    }
    try{
      const blogComment = await Blog.findOneAndUpdate( {_id:id},{$push: {comments:{userId,userName,comment:comment}}},{new:true});
      
      res.json({message:"Updated : "+id+ "COMMENTS:" ,blogComment})
    }catch(e){
      next({status:500,message:e.message})
    }
  }
  

module.exports = { getAllBlogs , currentUserBlogs,specificBlog,addBlog,deleteBlog, updateBlog,getAllComments,updateComment }