/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import response from '../helpers/response.helper';
import verifyAllTokens from '../helpers/verify.token.helper';
import verifyAllToken from '../helpers/verifyUsersToken';
// import verifyGoogleTokens from '../helpers/verify.tokenGoogle.helper';
import UserServices from '../services/user.service';

dotenv.config();
/**
 * verify token class
 */
class verifyToken {
  /**
   * check request params
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next continue with request
   * @returns {Object} user response
   */
  static paramToken(req, res, next) {
    const token = req.params.authorization;
    if (Number(token)) {
      return response.errorMessage(res, 'Token must not be a number', 401);
    }
    verifyAllTokens(req, res, next, token);
  }

  static paramTokenUsers(req, res, next) {
    if (req.headers.authorization === undefined) {
      return response.errorMessage(res, 'Unauthorized Access', 401);
    }
    if (!/(?=^[Bb]earer)/.test(req.headers.authorization)) {
      return response.errorMessage(res, '"Bearer" not found Invalid token!', 401);
    }
    const token = req.headers.authorization.split(' ')[1];
    if (Number(token)) {
      return response.errorMessage(res, 'Token must not be a number', 401);
    }
    verifyAllToken(req, res, next, token);
  }

  static async verifyUserToken(req, res, next) {
    try {
      const token = req.query.authorization;
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const user = await UserServices.findUserByEmail(decoded.payload.email);
      if (user === undefined) {
        return response.errorMessage(res, 'Invalid Account!', 404);
      }
      if (user.token !== token && user.token === null) {
        return response.successMessage(res, 'You need to signUp first!', 401, 'error');
      }
      req.user = user;
      return next();
    } catch (e) {
      response.errorMessage(res, e.message, 401);
    }
  }

  static async verifyUserTokenId(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      if (Number(token)) {
        return response.errorMessage(res, 'Token must not be a number', 401);
      }
      const user = await UserServices.findUserById(decoded.payload.id);
      if (user === undefined) {
        return response.errorMessage(res, 'User not found!', 404);
      }
      if (user.token !== token && user.token === null) {
        return response.successMessage(res, 'You need to signUp first!', 401);
      }
      req.user = user;
      return next();
    } catch (e) {
      response.errorMessage(res, e, 401);
    }
  }

  /**
   * check request headers
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next continue
   * @returns {Object} return user message
   */
  static headerToken(req, res, next) {
    if (req.headers.authorization === undefined) {
      return response.errorMessage(res, 'Please Set The Authorization Header!', 401);
    }
    if (!/(?=^[Bb]earer)/.test(req.headers.authorization)) {
      return response.errorMessage(res, '"Bearer" not found Invalid token!', 401);
    }
    const token = req.headers.authorization.split(' ')[1];
    verifyAllTokens(req, res, next, token);
  }

  // verifyAdminTokens function is notdefined anywhere in the codebase
  // /**
  //  * check request headers
  //  * @param {Object} req user request
  //  * @param {Object} res user response
  //  * @param {Object} next continue
  //  * @returns {Object} return user message
  //  */
  // static headerTokens(req, res, next) {
  //   if (req.headers.authorization === undefined) {
  //     return response.errorMessage(res, 'Please Set The Authorization Header!', 401);
  //   }
  //   if (!/(?=^[Bb]earer)/.test(req.headers.authorization)) {
  //     return response.errorMessage(res, '"Bearer" not found Invalid token!', 401);
  //   }
  //   const token = req.headers.authorization.split(' ')[1];
  //   verifyAdminTokens(req, res, next, token);
  // }

  /**
   * check request headers
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next continue
   * @returns {Object} return user message
   */
  static googleHeaderToken(req, res, next) {
    if (req.headers.authorization === undefined) {
      return response.errorMessage(res, 'Please Set The Authorization Header!', 401);
    }
    if (!/(?=^[Bb]earer)/.test(req.headers.authorization)) {
      return response.errorMessage(res, '"Bearer" not found Invalid token!', 401);
    }
    return next();
  }
}

export default verifyToken;
