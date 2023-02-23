module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_rooms', {
      room_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      user_id1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      user_id2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        }
      },
    });
  },
      
  down: async (queryInterface) => {
    await queryInterface.dropTable('users_rooms');
  },
};