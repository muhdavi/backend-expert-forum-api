const NewComment = require('../NewComment');

describe('a NewComment entities', () => {
    it('should throw error when userId is invalid', () => {
        const userId = '';
        const threadId = 'thread-id_test';
        const payload = {
            content: 'comment comment test',
        };

        expect(() => new NewComment(userId, threadId, payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when userId did not meet data type specification', () => {
        const userId = 5432;
        const threadId = 'thread-id_test';
        const payload = {
            content: 'comment content test',
        };

        expect(() => new NewComment(userId, threadId, payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when threadId is invalid', () => {
        const userId = 'user-5432';
        const threadId = '';
        const payload = {
            content: 'comment content test',
        };

        expect(() => new NewComment(userId, threadId, payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when threadId did not meet data type specification', () => {
        const userId = 'user-id_test';
        const threadId = 5432;
        const payload = {
            content: 'comment content test',
        };

        expect(() => new NewComment(userId, threadId, payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when payload did not contain needed property', () => {
        const userId = 'user-id_test';
        const threadId = 'thread-id_test';
        const payload = {};

        expect(() => new NewComment(userId, threadId, payload)).toThrowError('NEW_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const userId = 'user-id_test';
        const threadId = 'thread-id_test';
        const payload = {
            content: 5432,
        };

        expect(() => new NewComment(userId, threadId, payload)).toThrowError('NEW_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create newComment object correctly', () => {
        const expectedUserId = 'user-id_test';
        const expectedThreadId = 'thread-id_test';
        const payload = {
            content: 'comment content test',
        };

        const { userId, threadId, content } = new NewComment(expectedUserId, expectedThreadId, payload);

        expect(userId).toEqual(expectedUserId);
        expect(threadId).toEqual(expectedThreadId);
        expect(content).toEqual(payload.content);
    });
});
