// import db from "./index";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      firstName: { type: DataTypes.STRING, allowNull: true },
      lastName: { type: DataTypes.STRING, allowNull: true },
      userName: { type: DataTypes.STRING, allowNull: true },
      avatar: DataTypes.STRING,
      avatarAwsDetails: DataTypes.JSONB,
      talkMusicId: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.BIGINT, allowNull: false, unique: true },
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
  };
  return user;
};
