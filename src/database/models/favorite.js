
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
      'favorite',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        playlistId: { type: DataTypes.UUID, allowNull: true },
        artistId: { type: DataTypes.UUID, allowNull: true },
        songId: { type: DataTypes.UUID, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: true },
        favorite: { type: DataTypes.BOOLEAN, allowNull: true },
      },
      {}
  );
  favorite.associate = (models) => {
    // association goes here

      favorite.belongsTo(models.playlist, {
          foreignKey: 'playlistId',
          as: 'playlistFavs',
          onDelete: 'CASCADE',
      });
      favorite.belongsTo(models.artist, {
          foreignKey: 'artistId',
          as: 'artistFavs',
          onDelete: 'CASCADE',
      });
  };
  return favorite;
};
