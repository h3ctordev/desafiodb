const { options } = require('../options/SQLite3.js');

const knex = require('knex')(options);

// Asegurarse de eliminar las tablas si existen
knex.schema
  .dropTableIfExists('products')
  .then(() => console.log('se elimina tabla products'))
  .catch((e) => console.error('Error al eliminar tabla productos: ', e))
  .finally((x) => knex.destroy());

// Tabla productos
knex.schema
  .createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.integer('price');
    table.string('image');
  })
  .then(() => {
    console.log('Tabla products creada');
  })
  .catch((e) => console.error('Error al crear tabla products: ', e))
  .finally((x) => knex.destroy());
