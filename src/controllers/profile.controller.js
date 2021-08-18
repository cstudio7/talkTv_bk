import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import profileHelper from '../helpers/profile.helper';
import db from '../database/models';

dotenv.config();

/**
 * Class for users related operations such Sign UP, Sign In and others
 */

class profileController {

    /**
     * It activate a user account by updating isVerified attribute to true
     * @param {int} req This is the parameter(user id) that will be passed in url
     * @param {object} res This is a response will be send to the user
     * @returns {object} return object which include status and message
     */
    static async viewProfile(req, res) {
        return profileHelper.getProfileData(req, res);
    }

    /**
     * It activate a user account by updating isVerified attribute to true
     * @param {int} req This is the parameter(user id) that will be passed in url
     * @param {object} res This is a response will be send to the user
     * @returns {object} return object which include status and message
     */

    static async editProfile(req, res) {
      try {
        const user = req.user;
        const { email } = user;
        const userInfo = req.body;
          await user.update(userInfo);
          // Check if user is verified
          if (user.isVerified === false) {
              const status = 401;
              return response.errorMessage(res, 'User Is Not Verified, Please verify the User First', status);
          }
          const user2 = await db.user.findOne({
              where: { email }
          });
          const profile = profileHelper.chooseProfileData(user2);
          return response.successMessage(
              res,
              'User Profile are Updated',
              200,
              profile
          );
      } catch (e) {
          return response.errorMessage(res, e.message, 400);
      }
    }

}

export default profileController;
