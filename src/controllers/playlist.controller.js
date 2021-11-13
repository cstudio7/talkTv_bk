import response from '../helpers/response.helper';
import db from '../database/models';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class playlistController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async addPlaylist(req, res) {
    try {
       await db.playlist.create(req.body);
      response.successMessage(res, 'Playlist created successfully', 201);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getPublicPlaylist(req, res) {
    const { category } = req.query;
    try {
      const playlist = await db.playlist.findAll({
        where: { category },
      });
      const data = {
        playlist,
      };
      response.successMessage(res, 'All Playlist', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getAllPlaylist(req, res) {
    try {
      const playlist = await db.playlist.findAll();
      const data = {
        playlist
      };
      response.successMessage(res, 'Playlist', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async getOnePlaylist(req, res) {
    const { id } = req.params;
    try {
      const playlist = await db.playlist.findOne(
          {where: {id}}
      );
      const data = {
        playlist
      };
      response.successMessage(res, 'Playlist', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }


  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async editPlaylist(req, res) {
    try {
      const { id } = req.params;
      const infoData = req.body;
      const playlistToUpdate = await db.playlist.findOne({ where: { id } });
      const newList = await playlistToUpdate.update(infoData);
      const data = {
        newList,
      };
      return response.successMessage(res, 'Updated Successfully.', 200, data);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * User can get all client associated to a user
   * @param {int} req This is the parameter(user id) that will be passed in url
   * @param {object} res This is a response will be send to the user
   * @returns {object} return object which include status and message
   */
  static async deletePlaylist(req, res) {
    try {
      const { id } = req.body;
      await db.playlist.destroy({ where: { id } });
      response.successMessage(res, 'Playlist deleted', 200)
    } catch (e) {
      return response.errorMessage(res, e.message, 404);
    }
  }
}

export default playlistController;
