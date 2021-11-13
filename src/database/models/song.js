module.exports = (sequelize, DataTypes) => {
    const song = sequelize.define(
        'song',
        {
            playlistId: {type: DataTypes.UUID},
            artistId: {type: DataTypes.UUID},
            artist: { type: DataTypes.STRING, allowNull: true },
            link: { type: DataTypes.STRING, allowNull: true },
            downloadLink: { type: DataTypes.STRING, allowNull: true },
            title: { type: DataTypes.STRING, allowNull: true },
            downloads: { type: DataTypes.BIGINT },
            album: { type: DataTypes.STRING, allowNull: true },
            time: { type: DataTypes.TIME, allowNull: true },
            avatar: { type: DataTypes.STRING },
            avatarAwsDetails: { type: DataTypes.JSONB },
        },
        {}
    );
    song.associate = (models) => {
        // association goes here
        song.belongsTo(models.playlist, {
            foreignKey: 'playlistId',
            as: 'musics',
            onDelete: 'CASCADE',
        });
        song.belongsTo(models.artist, {
            foreignKey: 'artistId',
            as: 'music',
            onDelete: 'CASCADE',
        });
    };
    return song;
};
