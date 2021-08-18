import jwt from 'jsonwebtoken';
import response from './response.helper';
import UserServices from '../services/user.service';

const verifyAllToken = async (req, res, next, token) => {
  try {
    if (!token) {
      return response.errorMessage(res, 'No token provided, Access Denied!', 401);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const {
      payload: { email, phoneNumber },
    } = decodedToken;
    const code = Math.floor(100000 + Math.random() * 900000);
    const phone = phoneNumber || code;
    const emails = email || `${code}`;
    const userByPhone = await UserServices.findUserByPhone(phone);
    const userByEmail = await UserServices.findUserByEmail(emails);

    if (userByPhone === undefined && userByEmail === undefined) {
      return response.errorMessage(res, 'You provided the invalid token!', 401);
    }

    if (userByPhone === null) {
      if (userByEmail.token === null && userByEmail.token !== token) {
        return response.errorMessage(res, 'Access Expired, Please Login!', 401);
      }
      req.user = userByEmail;
      return next();
    }

    if (userByEmail === null) {
      if (userByPhone.token === null && userByPhone.token !== token) {
        return response.errorMessage(res, 'Access Expired, Please Login!', 401);
      }
      req.user = userByPhone;
      return next();
    }
  } catch (e) {
    return response.errorMessage(res, e.message, 400);
  }
};
export default verifyAllToken;
