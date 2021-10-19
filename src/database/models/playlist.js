// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const playlist = sequelize.define(
        'playlist',
        {
            name: { type: DataTypes.STRING, allowNull: true },
            desc: { type: DataTypes.STRING, allowNull: true },
            author: { type: DataTypes.UUID, allowNull: true },
            avatar: { type: DataTypes.STRING },
            avatarAwsDetails: { type: DataTypes.JSONB },
            likes: { type: DataTypes.BOOLEAN },
            favorites: { type: DataTypes.BOOLEAN  },
            comment: { type: DataTypes.BOOLEAN  },
            MusicId: { type: DataTypes.BIGINT, allowNull: false },
            downloads: { type: DataTypes.BIGINT }
        },
        {}
    );
    playlist.associate = (models) => {
        // association goes here
    };
    return playlist;
};
