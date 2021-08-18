/* eslint-disable require-jsdoc */
// import UserServices from '../services/user.service';
import response from '../helpers/response.helper';
import verifyAllTokens from '../helpers/verify.token.helper';

class verifyCode {
  /**
   * check request body
   * @param {Object} req user request
   * @param {Object} res user response
   * @param {Object} next continue with request
   * @returns {Object} user response
   */
  static codeCheck(req, res, next) {
    const { code, phoneNumber } = req.body;
    if (!Number(code) || !Number(phoneNumber)) {
      return response.errorMessage(res, 'Token must not be a number', 401);
    }
    verifyAllTokens(req, res, next, code);
  }
}

export default verifyCode;
