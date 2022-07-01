const { options } = require('../options/SQLite3.js');
const knex = require('knex')(options);

class Contenedor {
  constructor(table) {
    this.table = table;
  }
  async insert(arr) {
    try {
      return await knex(this.table).insert(arr);
    } catch (error) {
      console.error(`error al insertar datos en ${this.table}:`, error);
      throw error;
    } finally {
      knex.destroy();
    }
  }
  async getAll() {
    try {
      return await knex.from(this.table).select('*');
    } catch (error) {
      console.error(`error al traer datos en ${this.table}:`, error);
      throw error;
    } finally {
      knex.destroy();
    }
  }
}

module.exports = Contenedor;
