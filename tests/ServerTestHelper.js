const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');

const ServerTestHelper = {
    async getAccessToken(userId = 'user-8532', username = 'muhdavi') {
        const payloadUser = {
            id: userId,
            username: username,
            password: 'secret',
            fullname: 'Dicoding Indonesia',
        };
        await UsersTableTestHelper.addUser(payloadUser);
        return Jwt.token.generate(payloadUser, process.env.ACCESS_TOKEN_KEY);
    },
};

module.exports = ServerTestHelper;
