import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import db from '../database/models';
import { Op } from 'sequelize';

dotenv.config();

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class likePlaylistController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */

  static async likePlaylist(req, res) {
    try {
      const { id, playlistId } = req.query;
      const userId = req.user.id;

      //Check if the playlist exist
      const existingPlaylist = await db.playlist.findOne({ where: { id }});
      if (!existingPlaylist) {
        return response.errorMessage(res, 'Playlist not found', 404);
      }

      //Get previous Likes
      const previousChoice = await db.playLike.findOne({ where: {
          [Op.and]: [{playlistId, userId }]
        } });

      // Check for previous like on article and undo
      if (previousChoice && previousChoice.like === true) {
        await db.playLike.destroy({ where: { [Op.and]: [{playlistId, userId }] } });

        // Update count on article table
        const data = await existingPlaylist.update(
          { likes: playlist.dataValues.likes - 1 },
          { where: { id: playlistId } }
        );

        return response.successMessage(res, 'like removed successfully', 201, data);
      }

      // Check if user previously disliked article (change dislike to like if true)
      if (previousChoice && previousChoice.like === false) {
        await db.playLike.update({ like: true }, { where:  { [Op.and]: [{playlistId, userId }] } });

        // Update count on article table
        const data = await db.playList.update(
          {
            likes: existingPlaylist.dataValues.likes + 1
          },
          { where: { id: playlistId } }
        );
        return response.successMessage(res, 'Liked Added', 201, data);
      }

      // Create new like if all above checks fail
      const data = await db.playLike.create({
        userId,
        playlistId,
        like: true,
      });

      // Update count on article table
      await db.playlist.update({ likes: existingPlaylist.dataValues.likes + 1 }, { where: { id: playlistId } });

      return response.successMessage(res, 'Liked Added', 201, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

}

export default likePlaylistController;
