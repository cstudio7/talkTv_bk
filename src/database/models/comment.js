
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
      'comment',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        category: { type: DataTypes.STRING, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: false },
        comment: { type: DataTypes.TEXT, allowNull: false }
      },
      {}
  );
    comment.associate = (models) => {
    // association goes here
  };
  return comment;
};
