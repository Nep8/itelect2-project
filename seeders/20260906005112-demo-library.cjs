'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const librarian = await bcrypt.hash('librarian123', 10);
    const member = await bcrypt.hash('member123', 10);

    await queryInterface.bulkInsert('Users', [
      {
        email: 'librarian@library.test', password: librarian, role: 'admin',
        createdAt: now, updatedAt: now },
      {
        email: 'reader@library.test', password: member, role: 'member',
        createdAt: now, updatedAt: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};