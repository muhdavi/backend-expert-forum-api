const AddComment = require('../AddComment');

describe('an AddComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
        };

        expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 5432,
            content: 'comment content test',
            owner: {},
        };

        expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addedComment object correctly', () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            owner: 'dicoding',
        };

        const addComment = new AddComment(payload);

        expect(addComment.id).toEqual(payload.id);
        expect(addComment.content).toEqual(payload.content);
        expect(addComment.owner).toEqual(payload.owner);
    });
});
