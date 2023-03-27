module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Rikelmy Lopes',
        phone_number: '+5538998392574',
        password: '$2a$12$bZ9DAxEDIy4L/o9ATNSU9euXzLtGNFoFTEdyk5dSDXqPJtzDbrF5a'
      },
      {
        name: 'Angelina Lopes',
        phone_number: '+5538999942513',
        password: '$2a$12$DjNArRnYPciBNb1/rd3fH.jX6ihg1t/U6rbD3BCEW8Hx646TarPNa'
      },
      {
        name: 'Jorge Alves',
        phone_number: '+5538999269825',
        password: '$2a$12$b6w9Em/xrSRkhmC69JAdJO6mHx61zmfvN5qGph5/Z7CuU1E50psnO'
      },
    ], {});
  },
  
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};