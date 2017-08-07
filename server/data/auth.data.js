const { ObjectID } = require('mongodb');


const getData = (db) => {
    const collection = db.collection('users');
    return {
        findBy(props) {
            return collection.findOne(props);
        },
        getById(id) {
            return collection.findOne({ _id: new ObjectID(id) })
                .then((user) => {
                    if (!user) {
                        return null;
                    }

                    user.id = user._id;
                    return user;
                });
        },
        getAll() {
            return collection.find({}).toArray();
        },

        //  !TODO: Check for existing users
        register(newUser) {
            const messageResponse = {};
            // return this.findBy({ username: newUser.username })
            //     .then((user) => {
            //         if (user) {
            //             // throw new Error('Duplicated user');
            //             messageResponse.error = true;
            //             messageResponse.status = 409;
            //             messageResponse.message = 'User already exts';
            //             return Promise.reject();
            //         }
            //         return newUser;
            //     })
            // .then((user) => {
            return collection.insert(newUser)
                .then((result) => {
                    return result;
                });
            // .catch((err) => {
            //     return err;
            // });
        },
    };
};

module.exports = { getData };
