const assert = require('assert');
const User = require('../src/user')

describe('it should delete a user', () => {
    let joe;
    beforeEach(async () => {
        try {
            joe = new User({ name: 'Joe' });
            await joe.save()
        } catch (error) {
            console.log('error deleting data', error)
        }
    })
    it('model instance remove ', async () => {
        const deleteUser = await joe.remove()
        const findDeletedUser = await User.findOne({ name: 'Joe' })
        assert(findDeletedUser === null)

    })

    it('class method remove', async () => {
        // Remove a bunch of records with same criteria
        const deleteUser = await User.deleteMany({ name: 'Joe' })
        const findDeletedUser = await User.findOne({ name: 'Joe' })
        assert(findDeletedUser === null)
    })

    it('class method findOneAndRemove', async () => {
        const deleteUser = await User.findOneAndRemove({ name: 'Joe' })
        const findDeletedUser = await User.findOne({ name: 'Joe' })
        assert(findDeletedUser === null)
    })

    it('class method findByIdAndRemove', async () => {
        const deleteUser = await User.findByIdAndRemove(joe._id)
        const findDeletedUser = await User.findOne({ name: 'Joe' })
        assert(findDeletedUser === null)
    })
})