const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog-users'
    },
    userName:{
        type:String,
        ref:'blog-users'
    },
    comment: {
        type:String,
        minLength:1,
        maxLength:500,
    },
    postedAt :{
        type:Date,
        default: Date.now
    }
})

module.exports =commentsSchema