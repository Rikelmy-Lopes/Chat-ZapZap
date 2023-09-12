module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      phone_number: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.STRING,
        autoIncrement: false,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
    
  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  },
};