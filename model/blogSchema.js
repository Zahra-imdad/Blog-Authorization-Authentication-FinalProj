const mongoose = require('mongoose');
const commentsSchema = require('./commentsSchema')

const blogSchema = mongoose.Schema({
    title:String,
    content:String,
    tags: [String],
    authorDetail :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog-users'
    },
    comments:[commentsSchema],
    postedAt : {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('blog-frontend',blogSchema)