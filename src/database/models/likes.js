
module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define(
      'like',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: false },
        like: DataTypes.BOOLEAN
      },
      {}
  );
   like.associate = (models) => {
    // association goes here
  };
  return like;
};
