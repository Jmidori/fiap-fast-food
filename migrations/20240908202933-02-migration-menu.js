'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TYPE menu_category AS ENUM ('lanche', 'acompanhamento', 'bebida', 'sobremesa')
    `);

    await queryInterface.createTable('menu_items', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      category: {
        type: 'menu_category',
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      available: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true
      },
      image: {
        type: Sequelize.BYTEA,
        allowNull: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('menu_items');

    await queryInterface.sequelize.query(`
      DROP TYPE menu_category
    `);
  }
};