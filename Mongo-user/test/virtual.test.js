const assert = require('assert');
const expect = require('expect')
const User = require('../src/user');
const { VirtualType } = require('mongoose');

describe('Virtual types', () => {
    it('postCount returns number of post', async () => {
        const joe = new User({
            name: 'Joe',
            posts: [{
                title: 'posttitle'
            }]
        });
        await joe.save()
        const newUser = await User.findOne({ name: 'Joe' })
        expect(newUser.postCount).toBe(1)
    })
})