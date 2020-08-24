const assert = require('assert');
const expect = require('expect')
const User = require('../src/user');


describe('Subdocuments', () => {
    it('can create a subdocument', async () => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'posttitle'
            }]
        });
        await joe.save()
        const user = await User.findOne({ name: 'Joe' })
        expect(user.posts[0].title).toBe('posttitle')
    });

    it('can add subdocuments to an existing record', async () => {
        const joe = new User({
            name: 'Joe',
            posts: []
        })
        await joe.save()
        const user = await User.findOne({ name: 'Joe' })
        user.posts.push({ title: 'new post' })
        await user.save()
        const savedPost = await User.findOne({ name: 'Joe' })
        expect(savedPost.posts[0].title).toBe('new post')
    })

    it('can remove an existing sub document', async () => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'post title'
            }]
        });
        await joe.save()
        const user = await User.findOne({ name: 'Joe' })
        await user.posts[0].remove()
        await user.save()
        const deletedPost = await User.findOne({ name: 'Joe' })
        expect(deletedPost.posts.length).toBe(0)
    })
});