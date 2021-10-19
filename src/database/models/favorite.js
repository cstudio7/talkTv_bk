
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define(
      'favorite',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: true },
        favorite: { type: DataTypes.BOOLEAN, allowNull: true },
      },
      {}
  );
  favorite.associate = (models) => {
    // association goes here
  };
  return favorite;
};
