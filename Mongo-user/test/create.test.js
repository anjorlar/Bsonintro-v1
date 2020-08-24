const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {

    it('saves a user', async () => {
        const joe = new User({ name: 'Joe' })
        // console.log(joe)
        try {
            const user = await joe.save();
            assert(!user.isNew)
        } catch (e) {
            console.log('error saving user', e);
        }
    });

    // xit the test will be pending hence it will not run
    // xit('should be pending', async () => {

    // });

    // in it.only the only test that will run
    // it.only()
});