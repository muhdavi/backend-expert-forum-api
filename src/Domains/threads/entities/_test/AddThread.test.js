const AddTread = require('../AddThread');

describe('an AddTread entities', () => {
    it('should throw error when payload did not contain needed property', () => {
        const payload = {
            title: 'thread title test',
            owner: 'user-123',
        };

        expect(() => new AddTread(payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload did not meet data type specification', () => {
        const payload = {
            id: 5432,
            title: 'thread title test',
            owner: {},
        };

        expect(() => new AddTread(payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should create addTread object correctly', () => {
        const payload = {
            id: 'thread-id_test',
            title: 'thread title test',
            owner: 'user-123',
        };

        const addThread = new AddTread(payload);

        expect(addThread.id).toEqual(payload.id);
        expect(addThread.title).toEqual(payload.title);
        expect(addThread.owner).toEqual(payload.owner);
    });
});
