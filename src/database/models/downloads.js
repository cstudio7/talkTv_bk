
module.exports = (sequelize, DataTypes) => {
  const download = sequelize.define(
      'download',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        playlistId: { type: DataTypes.UUID, allowNull: true },
        artistId: { type: DataTypes.UUID, allowNull: true },
        songId: { type: DataTypes.UUID, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: false },
        download: { type: DataTypes.BOOLEAN, allowNull: true }
      },
      {}
  );
    download.associate = (models) => {
    // association goes here
  };
  return download;
};
