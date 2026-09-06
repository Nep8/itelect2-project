'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Users', [
      { name: 'User 1', email: 'user1@example.test',
        createdAt: now, updatedAt: now },
      { name: 'User 2', email: 'user2@example.test',
        createdAt: now, updatedAt: now },
      { name: 'User 3', email: 'user3@example.test',
        createdAt: now, updatedAt: now }
    ]);

    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const idOf = (name) => users.find((u) => u.name === name).id;

    await queryInterface.bulkInsert('Tasks', [
      { title: 'Read 5 books', dueDate: '2026-09-01', completed: false,
        userId: idOf('User 1'), createdAt: now, updatedAt: now },
      { title: 'Brew coffee', dueDate: '2026-09-05', completed: false,
        userId: idOf('User 1'), createdAt: now, updatedAt: now },
      { title: 'Clean table', dueDate: '2026-09-03', completed: true,
        userId: idOf('User 2'), createdAt: now, updatedAt: now },
      { title: 'Take shower', dueDate: '2026-09-10', completed: false,
        userId: idOf('User 3'), createdAt: now, updatedAt: now },
      { title: 'Brush teeth', dueDate: '2026-09-02', completed: true,
        userId: idOf('User 3'), createdAt: now, updatedAt: now }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};