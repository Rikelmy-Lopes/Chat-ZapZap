module.exports = {
    up: async (queryInterface) => {
      await queryInterface.bulkInsert('users', [
        {
            name: 'Rikelmy Lopes',
            phone_number: '+5538998392574',
            password: 'rikelmy'
        },
        {
            name: 'Angelina Lopes',
            phone_number: '+5538999942513',
            password: 'angelina'
        },
        {
            name: 'Jorge Alves',
            phone_number: '+5538999269825',
            password: 'jorge'
        },
      ], {});
    },
  
    down: async (queryInterface) => {
      await queryInterface.bulkDelete('users', null, {});
    },
  };