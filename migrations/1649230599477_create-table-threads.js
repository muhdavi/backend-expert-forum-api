/* eslint-disable camelcase */
exports.up = pgm => {
    pgm.createTable('threads', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(255)',
            notNull: true,
        },
        body: {
            type: 'TEXT',
            notNull: true,
        },
        date: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        owner: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });

    pgm.addConstraint(
        'threads',
        'threads_owner_fk_users_id',
        'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
    );
};

exports.down = pgm => {
    pgm.dropTable('threads');
};
