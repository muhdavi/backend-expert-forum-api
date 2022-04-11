const NewThread = require('../../../Domains/threads/entities/NewThread');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddThreadUseCase = require('../AddThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('AddThreadUseCase', () => {
    it('should orchestrating the add thread action correctly', async () => {
        const useCaseUserId = 'user-id_test';
        const useCasePayload = {
            title: 'thread title test',
            body: 'thread body test',
        };
        const expectedAddThread = new AddThread({
            id: 'thread-id_test',
            title: useCasePayload.title,
            owner: useCaseUserId,
        });

        const mockThreadRepository = new ThreadRepository();
        mockThreadRepository.addThread = jest.fn(() => Promise.resolve(new AddThread({
            id: 'thread-id_test',
            title: useCasePayload.title,
            owner: useCaseUserId,
        })));

        const addThreadUseCase = new AddThreadUseCase({ threadRepository: mockThreadRepository });
        const addThread = await addThreadUseCase.execute(useCaseUserId, useCasePayload);

        expect(addThread).toStrictEqual(expectedAddThread);
        expect(mockThreadRepository.addThread).toBeCalledWith(new NewThread(useCaseUserId, {
            title: useCasePayload.title,
            body: useCasePayload.body,
        }));
    });
});
