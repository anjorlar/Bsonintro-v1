const assert = require('assert');
const User = require('../src/user');

describe('it should update a user', () => {
    let joe;
    beforeEach(async () => {
        try {
            joe = new User({ name: 'Joe', likes: 0 })
            await joe.save()
        } catch (error) {
            console.log('error deleting data', error)
        }
    })

    it('instance type using set and save', async () => {
        joe.set('name', 'alex')
        await joe.save()
        const users = await User.find({})
        assert(users.length === 1)
        assert(users[0].name === 'alex')
    });

    it('A model instance can update', async () => {
        await joe.updateOne({ name: 'alex' })
        await joe.save()
        const users = await User.find({})
        assert(users.length === 1)
        assert(users[0].name === 'alex')
    })

    it('A model class can update', async () => {
        const updatedUser = await User.updateMany({ name: 'Joe' }, { name: 'alex' })
        const users = await User.find({})
        assert(users.length === 1)
        assert(users[0].name === 'alex')
    })

    it('A model class can one update', async () => {
        const updatedUser = await User.findOneAndUpdate({ name: 'Joe' }, { name: 'alex' })
        const users = await User.find({})
        assert(users.length === 1)
        assert(users[0].name === 'alex')
    })

    it('A model class can find a record with an Id and update', async () => {
        const updatedUser = await User.findByIdAndUpdate(joe._id, { name: 'alex' })
        const users = await User.find({})
        assert(users.length === 1)
        assert(users[0].name === 'alex')
    })

    it('A user can have their postCount incremented by one', async () => {
        const updatedUser = await User.findOneAndUpdate({ name: 'Joe' }, { $inc: { likes: 10 } })
        const users = await User.findOne({ name: 'Joe' })
        assert(users.likes === 10)
    })
})