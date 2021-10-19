import response from '../helpers/response.helper';
import db from '../database/models';
import s3delete from '../middlewares/fileUpload/delete';
import upload from '../middlewares/fileUpload/upload';

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
  static async addPhoto(req, res) {
    try {
      let details;
      if (req.file) {
        details = req.file;
      } else {
        details = req.files;
      }
      if (!req.files) {
        return response.errorMessage(res, 'please upload a valid image', 400);
      }
      const { id } = req.user;
      const newPhoto = [];
      details.forEach((ele) => {
        newPhoto.push({
          artisanId: id,
          photo: ele.location,
          info: ele.originalname,
          photoAwsDetails: ele,
        });
      });
      await db.media.bulkCreate(newPhoto);
      response.successMessage(res, 'Photos uploaded successfully', 201);
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
  static async getPhoto(req, res) {
    const { id } = req.user;
    try {
      const photo = await db.media.findAll({
        where: { artisanId: id },
      });
      const data = {
        photo,
      };
      response.successMessage(res, 'Gallery photos', 200, data);
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
  static async getAllPhoto(req, res) {
    const { artisanId } = req.query;
    try {
      const photo = await db.media.findAll({
        where: { artisanId },
      });
      const data = {
        photo,
      };
      response.successMessage(res, 'Gallery photos', 200, data);
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
  static async getOnePhoto(req, res) {
    const { id } = req.params;
    try {
      const photo = await db.media.findOne({
        where: { id },
      });
      const data = {
        photo,
      };
      response.successMessage(res, 'Gallery photo', 200, data);
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
  static async editPhoto(req, res) {
    try {
      const { id } = req.body;
      const infoData = req.body;
      const photoToUpdate = await db.media.findOne({ where: { id } });
      const newPhoto = await photoToUpdate.update(infoData);
      const data = {
        newPhoto,
      };
      return response.successMessage(res, 'Gallery Updated Successfully.', 200, data);
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
  static async deletePhoto(req, res) {
    try {
      const { id } = req.body;
      const photoToDelete = await db.media.findOne({ where: { id } });
      const photoData = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: photoToDelete.photoAwsDetails.key,
      };
      await s3delete(photoData);
      await db.media.destroy({ where: { id } });
      response.successMessage(res, 'photo deleted successfully', 200);
    } catch (e) {
      return response.errorMessage(res, e.message, 404);
    }
  }
}

export default playlistController;
