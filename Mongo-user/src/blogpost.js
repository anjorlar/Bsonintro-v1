const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

const blogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = blogPost;