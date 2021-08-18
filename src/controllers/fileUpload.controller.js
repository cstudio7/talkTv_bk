import response from '../helpers/response.helper';
import s3delete from '../middlewares/fileUpload/delete';

/**
 * Class for users related operations such Sign UP, Sign In and others
 */
class fileUploadController {
  /**
   * Add a client and saving client data in the database
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   */
  static async uploadAvatar(req, res) {
    try {
      const data = {
        avatar: req.file.location,
        avatarAwsDetails: req.file,
      };
      const user = req.user;
      if (user.avatar && user.avatarAwsDetails) {
        const photoData = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: user.avatarAwsDetails.key,
        };
        await s3delete(photoData);
      }
      await user.update(data);
      response.successMessage(res, 'Avatar Updated Successfully', 201, data.avatar);
    } catch (e) {
      return response.errorMessage(res, e.message, 400);
    }
  }
}

export default fileUploadController;
