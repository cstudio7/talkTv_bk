// import db from "./index";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      fullName: { type: DataTypes.STRING, allowNull: true },
      userName: { type: DataTypes.STRING, allowNull: true },
      avatar: DataTypes.STRING,
      avatarAwsDetails: DataTypes.JSONB,
      talkMusicId: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.BIGINT, unique: true },
      email: { type: DataTypes.STRING, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: true },
      password: { type: DataTypes.STRING, allowNull: true },
      bio: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true },
      authType: { type: DataTypes.STRING, allowNull: false },
      isBlocked: { type: DataTypes.BOOLEAN, allowNull: true },
    },
    {}
  );
  user.associate = (models) => {
    // association goes here
      user.hasMany(models.playlist, {
          foreignKey: 'authorId',
          as: 'author',
          onDelete: 'CASCADE',
      });
      user.hasMany(models.favorite, {
          foreignKey: 'artisanId',
          as: 'favorite',
          onDelete: 'CASCADE',
      });
  };
  return user;
};
