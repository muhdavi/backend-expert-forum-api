const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
    it('should throw error when userId is invalid', () => {
        const userId = '';
        const payload = {
            title: 'thread title test',
            body: 'test body test',
        };

        expect(() => new NewThread(userId, payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when userId did not meet data type specification', () => {
        const userId = 5432;
        const payload = {
            title: 'thread title test',
            body: 'thread body test',
        };

        expect(() => new NewThread(userId, payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when payload did not contain needed property', () => {
        const userId = 'user-id_test';
        const payload = {
            body: 'thread body test',
        };

        expect(() => new NewThread(userId, payload)).toThrowError('NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const userId = 'user-id_test';
        const payload = {
            title: 5432,
            body: 'thread body test',
        };

        expect(() => new NewThread(userId, payload)).toThrowError('NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newThread object correctly', () => {
        const expectedUserId = 'user-id_test';
        const payload = {
            title: 'thread title test',
            body: 'thread body test',
        };

        const { userId, title, body } = new NewThread(expectedUserId, payload);

        expect(userId).toEqual(expectedUserId);
        expect(title).toEqual(payload.title);
        expect(body).toEqual(payload.body);
    });
});
