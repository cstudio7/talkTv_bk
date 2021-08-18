module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      userName: {
        type: Sequelize.STRING,
        unique: true
      },
      talkMusicId: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.BIGINT,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.STRING,
      },
      avatarAwsDetails: {
        type: Sequelize.JSONB,
      },
      bio: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      authType: {
        type: Sequelize.STRING,
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  },
};
