const mongoose = require('mongoose');
const blogPost = require('./blogpost');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 character'
        }
    },
    posts: [
        {
            title: String,
        }
    ],
    likes: {
        type: Number,
        default: 0
    },
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: blogPost
    }],
});

UserSchema.virtual('postCount').get(function () {
    return this.posts.length
});

UserSchema.pre('remove', async function (next) {
    //use mongoose.model to avoid cyclic requires
    const BlogPost = mongoose.model('blogPost');
    await BlogPost.remove({ _id: { $in: this.blogPosts } });
    next();
});


const User = mongoose.model('user', UserSchema);

module.exports = User; 