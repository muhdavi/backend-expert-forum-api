const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const AddCommentUseCase = require('../AddCommentUseCase');

describe('AddCommentUseCase', () => {
    it('should orchestrating the add comment action correctly', async () => {
        const userId = 'user-id_test';
        const threadId = 'thread-id_test';
        const useCasePayload = {
            content: 'comment content test',
        };

        const expectedAddComment = new AddComment({
            id: 'comment-id_test',
            content: useCasePayload.content,
            owner: userId,
        });

        const mockThreadRepository = new ThreadRepository();
        const mockCommentRepository = new CommentRepository();

        mockThreadRepository.isThreadExists = jest.fn().mockImplementation(() => Promise.resolve());
        mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(expectedAddComment));

        const addCommentUseCase = new AddCommentUseCase({
            threadRepository: mockThreadRepository,
            commentRepository: mockCommentRepository,
        });

        const addComment = await addCommentUseCase.execute(userId, threadId, useCasePayload);

        expect(addComment).toStrictEqual(expectedAddComment);
        expect(mockCommentRepository.addComment).toBeCalledWith(new NewComment(userId, threadId, useCasePayload));
        expect(mockThreadRepository.isThreadExists).toBeCalledWith(threadId);
    });
});
