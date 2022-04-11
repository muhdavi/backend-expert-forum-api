const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('ThreadRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addThread function', () => {
        it('should persist new thread and return added thread correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'sercret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding',
            });

            const newThread = new NewThread('user-id_test', { title: 'thread title test', body: 'thread body test' });

            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);
            await threadRepositoryPostgres.addThread(newThread);

            const threads = await ThreadsTableTestHelper.findThreadById('thread-id_test');
            expect(threads).toHaveLength(1);
        });

        it('should return added thread correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding',
            });

            const newThread = new NewThread('user-id_test', { title: 'thread title test', body: 'thread body test' });

            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            const addThread = await threadRepositoryPostgres.addThread(newThread);
            expect(addThread).toStrictEqual(new AddThread({
                id: 'thread-id_test',
                title: 'thread title test',
                owner: 'user-id_test',
            }));
        });
    });

    describe('isThreadExists function', () => {
        it('should throw error when given thread id not found', async () => {
            const threadId = 'thread-id_test';
            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await expect(threadRepositoryPostgres.isThreadExists(threadId)).rejects.toThrow(NotFoundError);
        });

        it('should not throw error when given thread id is found', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding',
            });

            const newThread = new NewThread('user-id_test', { title: 'thread title test', body: 'thread body test' });

            const fakeIdGenerator = () => 'id_test';
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator);

            await threadRepositoryPostgres.addThread(newThread);
            await expect(threadRepositoryPostgres.isThreadExists('thread-id_test')).resolves.not.toThrow(NotFoundError);
        });
    });

    describe('getThread function', () => {
        it('should return thread details correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding',
            });

            await ThreadsTableTestHelper.addThread({
                id: 'thread-id_test',
                title: 'thread title test',
                body: 'thread body test',
                owner: 'user-id_test',
            });

            await CommentsTableTestHelper.addComment('user-id_test', 'thread-id_test', 'comment-id_test', 'comment content test');
            const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
            const threadDetail = await threadRepositoryPostgres.getThreadById('thread-id_test');

            expect(threadDetail.id).toEqual('thread-id_test');
            expect(threadDetail.title).toEqual('thread title test');
            expect(threadDetail.body).toEqual('thread body test');
            expect(threadDetail.date).toBeTruthy();
            expect(threadDetail.username).toEqual('dicoding');
            expect(threadDetail.comments).toHaveLength(1);
        });
    });
});
