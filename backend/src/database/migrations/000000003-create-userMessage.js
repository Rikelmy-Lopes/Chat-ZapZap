module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_messages', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },  
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      room_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users_rooms',
          key: 'room_id',
        }
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
        
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_messages');
  },
};