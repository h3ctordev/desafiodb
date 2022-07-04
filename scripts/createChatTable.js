const { options } = require('../options/SQLite3.js');

const knex = require('knex')(options);

knex.schema
  .dropTableIfExists('chats')
  .then(() => console.log('se elimina tabla chat'))
  .catch((e) => console.error('Error al eliminar tabla chat: ', e))
  .finally((x) => knex.destroy());

// Tabla mensajes
knex.schema
  .createTable('chats', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('message');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  })
  .then(() => {
    console.log('Tabla chat creada');
  })
  .catch((e) => console.error('Error al crear tabla chat: ', e))
  .finally((x) => knex.destroy());
