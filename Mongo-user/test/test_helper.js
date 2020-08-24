const mongoose = require('mongoose')
let uri = 'mongodb://localhost:27017/users_test'

// before(async () => { // waits for how long it take for mongoose to connect before running any test
//     await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useFindAndModify: false,
//         useUnifiedTopology: true
//     });
//     await mongoose.connection
//         .once('open', () => console.log(`Connected successfully to ${uri}`))
//         .on('error', (error) => {
//             console.warn('Warning', error)
//         });
// })

// beforeEach(async () => {
//     try {
//         const { users, comments, blogposts } = mongoose.connection.collections;
//         // console.log(users)
//         // await users.drop()
//         // await mongoose.connection.collections.users.drop()
//     } catch (e) {
//         console.log('error deleting data', e)
//     }
// })

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    // mongoose.connection.collections.users.drop(() => {
    //     done();
    // })
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});