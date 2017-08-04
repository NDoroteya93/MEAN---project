const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    generateHashedPassword: (pwd) => {
        return bcrypt.hash(pwd, saltRounds)
            .then((hash) => {
                return hash;
            });
    },
    comparePassword: (currentUser, indbUser) => {
        return bcrypt.compare(currentUser, indbUser)
            .then((res) => {
                return res;
            });
    },
};
