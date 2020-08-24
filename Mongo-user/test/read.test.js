const User = require('../src/user')
const expect = require('expect');
const assert = require('assert');


describe('Reading users from database', () => {
    let joe, maria, alex, zach;
    beforeEach((done) => {
        alex = new User({ name: 'Alex' })
        joe = new User({ name: 'Joe' })
        maria = new User({ name: 'Maria' })
        zach = new User({ name: 'Zach' })

        Promise.all([maria.save(), alex.save(), joe.save(), zach.save()])
            .then(() => done())
            .catch((e) => console.log('error saving db ', e))
    })
    it('finds all users with name of joe', async () => {
        const user = await User.find({ name: 'Joe' })
        assert(user[0]._id.toString() === joe._id.toString())
    });

    it('find a user with a particular ID', async () => {
        const user = await User.findOne({ _id: joe._id })
        assert(user._id.toString() === joe._id.toString());
        assert(user.name === 'Joe')
    })

    it('can skip and limit the result set', async () => {
        const users = await User.find({})
            // we can sort the key value pair by either ascending(from A to Z) starting with 1 or descending (Z to A) -1
            .sort({ name: 1 })
            .skip(1).limit(2)
        // .then((users) => {
        console.log('>>>>>>>> users[0] users[0]', users[0].name)
        console.log('>>>>>>>> users[1] users[1]', users[1].name)
        console.log('>>>>>>>> length length', users.length)
        assert(users[0].name === 'Joe')
        assert(users[1].name === 'Maria')
        expect(users.length).toBe(2)
        expect(users[0].name).toBe('Joe')
        expect(users[1].name).toBe('Maria')
        // })
        // .catch((e) => console.log('error fetching skipped user from db ', e))
    })
})