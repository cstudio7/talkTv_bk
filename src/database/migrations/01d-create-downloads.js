'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('downloads', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      playlistId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
      },
      artistId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
      },
      songId: {
        allowNull: false,
        type: Sequelize.DataTypes.UUID,
      },
      TMSId: {
        allowNull: false,
        type: Sequelize.BIGINT,
      },
      comment: {
        type: Sequelize.TEXT,
      },
      download: {
        allowNull: false,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('downloads');
  },
};
