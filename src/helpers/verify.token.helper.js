import jwt from 'jsonwebtoken';
import response from './response.helper';
import UserServices from '../services/user.service';

const verifyAllTokens = async (req, res, next, token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const userByPhone = await UserServices.findUserByPhone(
      decodedToken.payload.phoneNumber || '44444444444'
    );
    const userByEmail = await UserServices.findUserByEmail(
      decodedToken.payload.email || '44444444444'
    );

    if (userByPhone === undefined && userByEmail === undefined) {
      return response.errorMessage(res, 'You provided the invalid token!', 401);
    }

    if (userByPhone === null) {
      if (userByEmail.token === null && userByEmail.token !== token) {
        return response.errorMessage(res, 'You need to signin first!', 401);
      }
      req.user = userByEmail;
      return next();
    }

    if (userByEmail === null) {
      if (userByPhone.token === null && userByPhone.token !== token) {
        return response.errorMessage(res, 'You need to signin first!', 401);
      }
      req.user = userByPhone;
      return next();
    }
  } catch (error) {
    response.errorMessage(res, error.message, 401);
  }
};
export default verifyAllTokens;
