const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const assert = require('assert');
const expect = require('expect');


describe('Middleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({ name: 'joe' });
        blogPost = new BlogPost({ title: 'Js is great', content: 'Yeah it is' });

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(() => done())
            .catch((e) => console.log('error saving db ', e))
    })

    it('users clean up dangling blogposts on remove', async () => {
        const user = await joe.remove()
        const countRecords = await BlogPost.count()
        console.log(countRecords)
        console.log('user user', countRecords)
        assert(countRecords === 0)

        // joe.remove()
        //     .then(() => BlogPost.count()).catch(e => e)
        //     .then((count) => {
        //         console.log('user user', count)
        //         assert(count === 0)
        //         done()
        //     }).catch(e => e)
    })
})