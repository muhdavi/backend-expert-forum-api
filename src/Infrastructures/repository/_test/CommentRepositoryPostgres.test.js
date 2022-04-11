const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const NewComment = require('../../../Domains/comments/entities/NewComment');
const AddComment = require('../../../Domains/comments/entities/AddComment');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

describe('CommentRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await ThreadsTableTestHelper.cleanTable();
        await CommentsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('addComment function', () => {
        it('should persist new comment and return added thread correctly', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test',
                password: 'secret',
                fullname: 'dicoding indonesia',
                username: 'dicoding',
            });

            await ThreadsTableTestHelper.addThread({
                id: 'thread-id_test',
                title: 'thread title test',
                body: 'thread body test',
                owner: 'user-id_test',
            });

            const fakeIdGenerator = () => 'id_test';
            const newComment = new NewComment('user-id_test', 'thread-id_test', { content: 'comment content test'});
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
            await commentRepositoryPostgres.addComment(newComment);

            const comment = await CommentsTableTestHelper.findCommentById('comment-id_test');
            expect(comment).toHaveLength(1);
        });

        it('should return added comment correctly', async () => {
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

            const fakeIdGenerator = () => 'id_test';
            const newComment = new NewComment('user-id_test', 'thread-id_test',{ content: 'comment content test' });
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);
            const addComment = await commentRepositoryPostgres.addComment(newComment);

            expect(addComment).toStrictEqual(new AddComment({
                id: 'comment-id_test',
                content: 'comment content test',
                owner: 'user-id_test',
            }));
        });
    });

    describe('verifyUserComment', () => {
        it('should throw NotFoundError when comment with given id not found', async () => {
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

            const fakeIdGenerator = () => 'id_test';
            const newComment = new NewComment('user-id_test', 'thread-id_test', { content: 'comment content test' });
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await commentRepositoryPostgres.addComment(newComment);
            await expect(commentRepositoryPostgres.verifyUserComment('user-id_test', 'comment-id-test')).rejects.toThrow(NotFoundError);
        });

        it('should throw AuthorizationError when comment deleted by non owner', async () => {
            await UsersTableTestHelper.addUser({
                id: 'user-id_test1',
                password: 'secret',
                fullname: 'Dicoding Indonesia',
                username: 'dicoding',
            });

            await UsersTableTestHelper.addUser({
                id: 'user-id_test2',
                password: 'secret',
                fullname: 'John Dav',
                username: 'johndav',
            });

            await ThreadsTableTestHelper.addThread({
                id: 'thread-id_test',
                title: 'thread title test',
                body: 'thread body test',
                owner: 'user-id_test1',
            });

            const fakeIdGenerator = () => 'id_test';
            const newComment = new NewComment('user-id_test1', 'thread-id_test', { content: 'comment content test' });
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await commentRepositoryPostgres.addComment(newComment);
            await expect(commentRepositoryPostgres.verifyUserComment('user-id_test2', 'comment-id_test')).rejects.toThrow(AuthorizationError);
        });

        it('should not throw AuthorizationError when comment deleted by the owner', async () => {
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

            const fakeIdGenerator = () => 'id_test';
            const newComment = new NewComment('user-id_test', 'thread-id_test', { content: 'comment content test' });
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await commentRepositoryPostgres.addComment(newComment);
            await expect(commentRepositoryPostgres.verifyUserComment('user-id_test', 'comment-id_test')).resolves.not.toThrow(AuthorizationError);
        });
    });

    describe('deleteComment function', () => {
        it('should set is_delete to true', async () => {
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

            const fakeIdGenerator = () => 'id_test';
            const newComment = new NewComment('user-id_test', 'thread-id_test', { content: 'comment content test' });
            const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator);

            await commentRepositoryPostgres.addComment(newComment);
            await commentRepositoryPostgres.deleteComment('user-id_test', 'thread-id_test', 'comment-id_test');
            const comments = await CommentsTableTestHelper.findCommentById('comment-id_test');

            expect(comments[0].is_delete).toBeTruthy();
        });
    });
});
