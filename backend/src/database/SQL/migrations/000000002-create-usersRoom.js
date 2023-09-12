module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_rooms', {
      room_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        autoIncrement: false,
      },
      phone_number1: {
        allowNull: false,
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'phone_number',
        }
      },
      phone_number2: {
        allowNull: false,
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'phone_number',
        }
      },
    });
  },
      
  down: async (queryInterface) => {
    await queryInterface.dropTable('users_rooms');
  },
};