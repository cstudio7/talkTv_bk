
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
      'comment',
      {
        userId: { type: DataTypes.UUID, allowNull: true },
        TMSId: { type: DataTypes.BIGINT, allowNull: false },
        comment: DataTypes.TEXT
      },
      {}
  );
    comment.associate = (models) => {
    // association goes here
  };
  return comment;
};
