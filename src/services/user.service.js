import { Op } from 'sequelize';
import db from '../database/models';
import Queries from './Queries';
import response from '../helpers/response.helper';
import GenerateToken from '../helpers/token.helper';



/**
 * This class contains functions for all user services.
 */
class UserServices {
  /**
   * creating user query
   * @param {string} NewUser users table in database.
   * @returns {array} data the data to be returned.
   */
  static async CreateUser(NewUser) {
    try {
      const { phoneNumber, email } = NewUser;
      const userWithPhone = await UserServices.findExistingUser(phoneNumber, email);

      if (userWithPhone) {
        const res = null;
        response.successMessage(
          res,
          'user created successfully, proceed to verify your account from your phone',
          201,
          'done real'
        );
      }
      return Queries.create(db.user, NewUser);
    } catch (e) {
      return e;
    }
  }

  /**
   * Find user by phoneNumber
   * @param {Object} phoneNumber of the User email.
   * @param {Object} email of the User email.
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   */
  static async findExistingUser(email) {
    try {
      const user = await db.user.findOne({
        where: {email}});
      if (!user) return null;
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * service to get Supported Role In Database
   // eslint-disable-next-line valid-jsdoc
   * @param {Object} name user request
   * @returns {Object} return user message
   */
  static async getRole(name) {
    try {
      const searchRole = await db.role.findOne({ where: { name } });
      if (!searchRole) return null;
      return searchRole;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * This a function that update a user account fields
   * @param {string} id this is a user email
   * @param {object} userInfo this is user's fields you want to update
   * @returns {object} return  a response object
   */
  static async updateUserById(id, userInfo) {
    const userToUpdate = await db.user.findByPk(id);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    const updatedUser = await userToUpdate.update(userInfo);
    return updatedUser;
  }

  /**
   * Find user by phoneNumber
   * @param {Object} phoneNumber of the User.
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   */
  static async findUserByPhone(phoneNumber) {
    try {
      const user = await db.user.findOne({
        where: { phoneNumber },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Find user by phoneNumber
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   * @param {String} id
   */
  static async findUserById(id) {
    try {
      const user = await db.user.findOne({
        where: { id },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Find user by phoneNumber
   * @param {String} phoneNumber of the User phone number.
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   */
  static async findUserByPhoneToken(phoneNumber) {
    try {
      const user = await db.user.findOne({
        where: {
          [Op.or]: [{ phoneNumber }],
        },
      });

      if (!user) return null;
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Find user by Email
   * @param {String} email of the User email.
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   */
  static async findUserByEmail(email) {
    try {
      const user = await db.user.findOne({
        where: { email }
      });
      if (!user) return null;
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Get user profile
   * @param {String} id of the User id.
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   */
  static async getUsersProfileById(id) {
    try {
      const user = await db.user.findOne({
        where: { id },
        include: [
          {
            model: db.profile,
            as: 'profile',
            include: ['cardDetails'],
          },
        ],
      });
      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * Find user by phoneNumber
   * @param {String} phoneNumber of the User email.
   * @param {String} code of the User email.
   * @returns {Object} Returns a user object and if user doesn't exist it returns null.
   */
  static async findUserByPhoneAndCode(phoneNumber, code) {
    try {
      const user = await db.user.findOne({
        where: {
          [Op.and]: [{ phoneNumber }, { code }],
        },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      return undefined;
    }
  }

  /**
   * This a function that creates a user if he is not found in the database
   * @param {object} user this is a user email to be updated
   * @returns {object} return  a response object
   */
  static async findOrCreateUser(user) {
    const { email } = user;
    try {
      return await db.user.findOrCreate({
        where: { email },
        defaults: user,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * This a function that activete a user account
   * @param {string} phoneNumber this is a user mobile Number to be updated
   * @param {string} code of the user to be updated
   * @param {object} updateUser this is a value need to update  a user account
   * @returns {object} return  a response object
   */
  static async activeUser(phoneNumber, code, updateUser) {
    /**
     * This is exception handling
     *@return {object} return an error object if there is any
     */

    try {
      const userToUpdate = await db.user.findOne({
        where: {
          [Op.and]: [{ phoneNumber }, { code }],
        },
      });

      if (userToUpdate && userToUpdate.isVerified) {
        return {
          status: 409,
          message: 'User already activated',
        };
      }

      if (userToUpdate) {
        await db.user.update(updateUser, { where: { phoneNumber }, returning: true, plain: true });

        return {
          status: 200,
          message: 'Account successfully activated',
        };
      }

      if (!userToUpdate) {
        return {
          status: 404,
          message: 'User not found',
        };
      }

    } catch (error) {
      return {
        status: 400,
        message: error,
      };
    }
  }

  /**
   * This a function that activete a user account
   * @param {string} email this is a user email to be updated
   * @param {object} updateUser this is a value need to update  a user account
   * @returns {object} return  a response object
   */
  static async verifyUser(email, updateUser) {
    /**
     * This is exception handling
     *@return {object} return an error object if there is any
     */

    try {
      const userToUpdate = await db.user.findOne({
        where: { email },
      });
      if (userToUpdate && userToUpdate.isVerified) {
        return {
          status: 409,
          message: 'user already activated',
        };
      }
      if (userToUpdate) {
        const activate = {
          isVerified: true,
        };
        await userToUpdate.update(activate);
        return {
          status: 200,
          message: 'Account successfully activated',
        };
      }
    } catch (error) {
      return {
        status: 400,
        message: error,
      };
    }
  }

  /**
   * service to reset a password
   // eslint-disable-next-line valid-jsdoc
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {String} email user email
   * @param {String} enxPassword
   * @param {String} token
   * @returns {Object} return user message
   */
  static async resetPassword(req, res, email, enxPassword, token) {
    const userToUpdate = await db.user.findOne({ where: { email } });
    const newToken = GenerateToken({
      email,
      isVerified: userToUpdate.isVerified,
      id: userToUpdate.id,
      category: userToUpdate.category,
    });
    const data = {
      password: enxPassword,
    };
    if (!userToUpdate.isVerified) {
      return response.errorMessage(res, 'Account is not verified', 401);
    }
    if (userToUpdate !== null) {
      await userToUpdate.update(data);
      return response.successMessage(res, 'Password has been changed successfully', 200, newToken);
    }
  }

  /**
   * service to reset a password
   // eslint-disable-next-line valid-jsdoc
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {String} pass
   * @param {String} code
   * @returns {Object} return user message
   */
  static async resetPasswordPh(req, res, pass, code) {
    const userToUpdate = await db.user.findOne({ where: { code } });
    if (!userToUpdate) {
      return response.errorMessage(res, 'Incorrect reset token or code', 401);
    }
    if (code !== userToUpdate.dataValues.code) {
      return response.errorMessage(res, 'Invalid Code', 401);
    }
    if (userToUpdate !== null && !userToUpdate.isVerified) {
      return response.errorMessage(res, 'Account is not verified', 401);
    }
    if (userToUpdate !== null) {
      const coded = Math.floor(100000 + Math.random() * 900000);
      const data = {
        password: pass,
        code: coded,
      };
      await userToUpdate.update(data);
      return response.successMessage(
        res,
        'Password has been changed successfully',
        200,
        'You can now sign in'
      );
    }
  }

  /**
   * This a function that update a user account fields
   * @param {string} phoneNumber 0r email this is a user email
   * @param {String} email
   * @param {object} userInfo this is user's fields you want to update
   * @returns {object} return  a response object
   */
  static async updateUser(phoneNumber, email, userInfo) {
    let userToUpdate;
    if (phoneNumber === '4444444444444') {
      userToUpdate = await this.findUserByEmail(email);
    }
    if (email === '4444444444444') {
      userToUpdate = await this.findUserByPhone(phoneNumber);
    }
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    return userToUpdate.update(userInfo);
  }

  /**
   * This a function that update a user account fields
   * @param {string} phoneNumber 0r email this is a user email
   * @param {object} userInfo this is user's fields you want to update
   * @returns {object} return  a response object
   */
  static async updateUserByPhone(phoneNumber, userInfo) {
    const userToUpdate = await UserServices.findUserByPhone(phoneNumber);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    if (!userToUpdate.isVerified) {
      return {
        status: 404,
        message: 'User is not verified',
      };
    }
    const dat = {
      code: userInfo,
    };
    return userToUpdate.update(dat);
  }

  /**
   * This a function that update a user account fields
   * @param {string} id 0r email this is a user email
   * @param {object} userInfo this is user's fields you want to update
   * @returns {object} return  a response object
   */
  static async updateUserId(id, userInfo) {
    const userToUpdate = await this.findUserById(id);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    return userToUpdate.update(userInfo);
  }

  /**
   * This a function that update a user account fields
   * @param {string} id this is a user email
   * @param {object} userInfo this is user's fields you want to update
   * @returns {object} return  a response object
   */
  static async updateProfile(id, userInfo) {
    const userToUpdate = await db.user.findOne({ where: { id } });
    const updatedUser = await userToUpdate.update(userInfo);
    if (!userToUpdate) {
      return {
        status: 404,
        message: 'Incorrect details',
      };
    }
    return updatedUser;
  }
}

export default UserServices;
