// import db from "./index";
module.exports = (sequelize, DataTypes) => {
    const artist = sequelize.define(
        'artist',
        {
            name: { type: DataTypes.STRING, allowNull: true },
            desc: { type: DataTypes.STRING, allowNull: true },
            category: { type: DataTypes.STRING },
            gender: { type: DataTypes.STRING },
            avatar: { type: DataTypes.STRING },
            avatarAwsDetails: { type: DataTypes.JSONB },
            likes: {type: DataTypes.UUID},
            favorites: { type: DataTypes.UUID },
            downloads: { type: DataTypes.BIGINT }
        },
        {}
    );
    artist.associate = (models) => {
        // association goes here
        // artist.hasMany(models.like, {
        //     foreignKey: 'playlistId',
        //     as: 'like',
        //     onDelete: 'CASCADE',
        // });
        artist.hasMany(models.favorite, {
            foreignKey: 'userId',
            as: 'favorite',
            onDelete: 'CASCADE',
        });
    };
    return artist;
};
