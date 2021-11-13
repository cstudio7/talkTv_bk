import dotenv from 'dotenv';
import response from '../helpers/response.helper';
import EncryptPassword from '../helpers/Encryptor';
import GenerateToken from '../helpers/token.helper';
import generateEmail from '../emailTemplates/verification';
import sendMail from '../helpers/emails';
import UserServices from '../services/user.service';
import checkPassword from '../middlewares/user.middleware';
import db from '../database/models';

dotenv.config();


/**
 * Class for users related operations such Sign UP, Sign In and others
 */

class userController {

  static async signup(req, res) {
    try {
      const {
          fullName,
          userName,
          email,
      } = req.body;
      const authType = "user"

      const password = EncryptPassword(req.body.password);
      const talkMusicId = `TM${Math.floor(1000000 + Math.random() * 9000000)}`;
      const existingUser = await UserServices.findExistingUser(email, userName);
      if (existingUser) {
        return response.errorMessage(res, 'user already exist', 409);
      }
        const token = GenerateToken({
            email,
            talkMusicId,
            userName,
            authType,
        });
        const NewUser = {
          fullName,
          userName,
          talkMusicId,
          email,
          password,
          authType,
          isBlocked: false,
        };


        //  const verificationEmail = generateEmail(NewUser);
        // await sendMail(
        //   process.env.SENDGRID_API_KEY,
        //   email,
        //   process.env.SENDER_EMAIL,
        //   'Talk Music',
        //   verificationEmail
        // );
        const data = {
          token,
        };
      await db.user.create(NewUser);
      return response.successMessage(
          res,
          'user created successfully, proceed to verify your account from your email',
          201,
          data
      );

    } catch (e) {
        console.log(e)
      return response.errorMessage(res, e.message, 400);
    }
  }

  /**
   * Logs in a user by checking if they exist in the database
   * and if the supplied password matches the stored password
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A user object with selected fields
   * excluing the password
   */
  static async signIn(req, res) {
    await checkPassword(req, res);
  }

    /**
     *login function to get profile from google and facebook and manipulate it
     *
     *
     *@param {object} accessToken response
     *@param {object} refreshToken response
     *@param {object} profile object
     *@param {object} done callback
     *@returns {object} object
     */
    static async googleAndFacebookPlusAuth(accessToken, refreshToken, profile, done) {
        try {
            const userData = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                authtype: profile.provider,
                profileImage: profile.photos[0].value,
                isVerified: true,
            };
            const [userCreated] = await UserServices.findOrCreateUser(userData);
            done(null, userCreated.dataValues);
        } catch (error) {
            done(error, false);
        }
    }

    /**
     *login function to return data from social accounts to the user
     *
     *
     *@param {object} req request
     *@param {object} res response
     *@returns {object} object
     */
    static async authGoogleAndFacebook(req, res) {
        const {
            authtype, email, firstName, isVerified, id, role
        } = req.user;
        const token = GenerateToken({
            email, firstName, isVerified, id, role
        });
        await UserServices.updateUser(req.user.email, { token });
        const userInfo = JSON.stringify({ authtype, token });
        return res.redirect(`${process.env.BASE_URL_REACT}?info=${userInfo}`);
    }

}

export default userController;
