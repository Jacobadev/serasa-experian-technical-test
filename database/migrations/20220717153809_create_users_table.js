const { timestamps } = require('../utils');

exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.uuid('uuid').defaultTo(knex.raw('(UUID())'));
    table.integer('role').defaultTo(0);
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.date('dob').notNullable();
    table.string('username').notNullable().unique();
    table.string('email').unique();
    table.string('password').notNullable();
    timestamps(knex, table);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('users');
};