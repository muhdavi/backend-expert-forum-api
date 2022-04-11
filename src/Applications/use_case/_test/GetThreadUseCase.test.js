const GetThreadUseCase = require('../GetThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThread = require('../../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../../Domains/comments/entities/DetailComment');

describe('GetThreadUseCase', () => {
    it('should orchestrating the get thread action correctly', async () => {
        const expectedThread = new DetailThread({
            id: 'thread-id_test',
            title: 'thread title test',
            body: 'thread body test',
            date: '2022-04-04 04:04:04.012345',
            username: 'dicoding',
            comments: [
                new DetailComment({
                    id: 'comment-id_test1',
                    content: 'comment content test',
                    date: '2022-04-04 04:04:05.012345',
                    username: 'johndoe',
                    isDelete: false,
                }),
                new DetailComment({
                    id: 'comment-_id_test2',
                    content: 'replay comment content test',
                    date: '2022-04-04 04:04:06.012345',
                    username: 'dicoding',
                    isDelete: true,
                }),
            ],
        });

        const mockThreadRepository = new ThreadRepository();

        mockThreadRepository.getThreadById = jest.fn().mockImplementation(() => Promise.resolve(expectedThread));
        mockThreadRepository.isThreadExists = jest.fn().mockImplementation(() => Promise.resolve());

        const getThreadUseCase = new GetThreadUseCase({
            threadRepository: mockThreadRepository,
        });

        const getThread = await getThreadUseCase.execute('thread-id_test');

        expect(getThread).toStrictEqual(expectedThread);
        expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-id_test');
        expect(mockThreadRepository.isThreadExists).toBeCalled();
    });
});
