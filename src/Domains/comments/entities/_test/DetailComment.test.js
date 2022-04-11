const DetailComment = require('../DetailComment');

describe('an DetailComment entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            date: '2022-04-04 04:04:04.012345',
        };

        expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            date: '2022-04-04 04:04:04.012345',
            username: 'dicoding',
            isDelete: 'yes',
        };

        expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create commentDetails object correctly', () => {
        const payload = {
            id: 'comment-id_test',
            content: 'comment content test',
            date: '2022-04-04 04:04:04.012345',
            username: 'dicoding',
            isDelete: false,
        };

        const commentDetail = new DetailComment(payload);

        expect(commentDetail.id).toEqual(payload.id);
        expect(commentDetail.content).toEqual(payload.content);
        expect(commentDetail.date).toEqual(payload.date);
        expect(commentDetail.username).toEqual(payload.username);
        expect(commentDetail.isDelete).toEqual(payload.isDelete);
    });
});
