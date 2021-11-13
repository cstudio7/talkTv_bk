// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const playlist = sequelize.define(
        'playlist',
        {
            name: { type: DataTypes.STRING, allowNull: true },
            desc: { type: DataTypes.STRING, allowNull: true },
            category: { type: DataTypes.STRING, allowNull: true },
            authorId: { type: DataTypes.UUID, allowNull: true },
            avatar: { type: DataTypes.STRING },
            avatarAwsDetails: { type: DataTypes.JSONB },
            likes: {type: DataTypes.UUID},
            favorites: { type: DataTypes.UUID },
            comment: { type: DataTypes.UUID  },
            download: { type: DataTypes.BIGINT }
        },
        {}
    );
    playlist.associate = (models) => {
        // association goes here
        playlist.belongsTo(models.user, {
            foreignKey: 'authorId',
            as: 'playlist',
            onDelete: 'CASCADE',
        });
        playlist.hasMany(models.comment, {
            foreignKey: 'comment',
            as: 'playlistComment',
            onDelete: 'CASCADE',
        });
        playlist.hasMany(models.playLike, {
            foreignKey: 'playlistId',
            as: 'like',
            onDelete: 'CASCADE',
        });
        playlist.hasMany(models.favorite, {
            foreignKey: 'userId',
            as: 'favorite',
            onDelete: 'CASCADE',
        });
    };
    return playlist;
};
