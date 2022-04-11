const DetailThread = require('../DetailThread');
const DetailComment = require('../../../comments/entities/DetailComment');

describe('an DetailThread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            id: 'thread-id_test',
            title: 'thread title test',
            body: 'thread body test',
            date: '2022-04-04 04:04:04.012345',
        };

        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 5432,
            title: 'thread title test',
            body: 'thread body test',
            date: '2022-04-04 04:04:04.012345',
            username: 'dicoding',
            comments: {},
        };

        expect(() => new DetailThread(payload)).toThrowError('DETAIL_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create threadDetail object correctly', () => {
        const payload = {
            id: 'thread-id_test',
            title: 'thread title test',
            body: 'thread body test',
            date: '2022-04-04 04:04:04.012345',
            username: 'dicoding',
            comments: [
                new DetailComment({
                    id: 'comment-id_test1',
                    username: 'johndoe',
                    date: '2022-04-04 04:04:05.012345',
                    content: 'comment content test',
                    isDelete: false,
                }),
                new DetailComment({
                    id: 'comment-id_test2',
                    username: 'dicoding',
                    date: '2022-04-04 04:04:06.012345',
                    content: 'replay comment content test',
                    isDelete: true,
                }),
            ],
        };

        const threadDetail = new DetailThread(payload);

        expect(threadDetail.id).toEqual(payload.id);
        expect(threadDetail.title).toEqual(payload.title);
        expect(threadDetail.body).toEqual(payload.body);
        expect(threadDetail.date).toEqual(payload.date);
        expect(threadDetail.username).toEqual(payload.username);
        expect(threadDetail.comments.length).toEqual(payload.comments.length);
        expect(threadDetail.comments.length).toEqual(2);
        expect(threadDetail.comments[0]).toStrictEqual(payload.comments[0]);
        expect(threadDetail.comments[1]).toStrictEqual(payload.comments[1]);
    });
});
