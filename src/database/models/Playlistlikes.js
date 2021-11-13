
module.exports = (sequelize, DataTypes) => {
  const playLike = sequelize.define(
      'playLike',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        playlistId: { type: DataTypes.UUID, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: false },
        like: DataTypes.BOOLEAN
      },
      {}
  );
    playLike.associate = (models) => {
    // association goes here
        playLike.belongsTo(models.playlist, {
           foreignKey: 'playlistId',
           as: 'playlistLikes',
           onDelete: 'CASCADE',
       });
  };
  return playLike;
};
