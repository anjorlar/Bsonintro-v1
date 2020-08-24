const assert = require('assert');
const User = require('../src/user')
const expect = require('expect')

describe('Validating records', async () => {
    it('validate if username is present', async () => {
        try {
            const user = new User({ name: undefined })
            const validationResult = await user.validateSync()
            const { message } = validationResult.errors.name
            expect(message).toBe('Name is required')
        } catch (e) {
            console.log('error saving user', e)
        }
    });

    it('validate if username is longer than 2 characters', async () => {
        try {
            const user = new User({ name: 'jo' })
            const validationResult = await user.validateSync()
            const { message } = validationResult.errors.name
            expect(message).toBe('Name must be longer than 2 character')
            // assert(message === 'Name must be longer than 2 characer')
        } catch (e) {
            console.log('error saving user', e)
        }
    });

    it('disallows invalid records from been saved', async () => {
        try {
            const user = new User({ name: 'Ko' })
            await user.save()
        } catch (validationResult) {
            const { message } = validationResult.errors.name
            assert(message === 'Name must be longer than 2 character')
        }
    })
});