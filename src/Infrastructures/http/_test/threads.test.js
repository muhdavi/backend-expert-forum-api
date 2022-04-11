const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const createServer = require('../createServer');
const container = require('../../container');

describe('/threads endpoint', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await ThreadsTableTestHelper.cleanTable();
    });
});