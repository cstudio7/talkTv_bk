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

    const user = await UserServices.findUserByEmail(email);

    if ( !(user)) {
      return response.errorMessage(res, 'You provided the invalid token!', 401);
    }

    req.user = user;
    return next();

  } catch (e) {
    return response.errorMessage(res, e.message, 400);
  }
};
export default verifyAllToken;
