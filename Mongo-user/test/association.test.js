const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogpost');
const assert = require('assert');
const expect = require('expect');


describe('Associations', async () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        blogPost = new BlogPost({ title: 'Js is great', content: 'Yeah it is' });
        comment = new Comment({ content: 'Congrats on this post' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done())
            .catch((e) => console.log('error saving db ', e))
    })

    it('saves a relation between a user and a blogpost', async () => {
        const user = await User.findOne({ name: 'joe' }).populate('blogPosts')
        assert(user.blogPosts[0].title === 'Js is great')
    })

    it('saves a full relation tree', async () => {
        const user = await User.findOne({ name: 'joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
        assert(user.name === 'joe');
        assert(user.blogPosts[0].title === 'Js is great')
        assert(user.blogPosts[0].comments[0].content === 'Congrats on this post')
        assert(user.blogPosts[0].comments[0].user.name === 'joe')
        // console.log('>>>>>>>>', user.blogPosts[0].comments[0])
    })

})