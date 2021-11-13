import jwt from 'jsonwebtoken';
import response from './response.helper';
import UserServices from '../services/user.service';

const verifyAllTokens = async (req, res, next, token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await UserServices.findUserByEmail(decodedToken.payload.email);
      if (user.token === null && user.token !== token) {
        return response.errorMessage(res, 'You need to signin first!', 401);
      }
      req.user = user;
      return next();

  } catch (error) {
    response.errorMessage(res, error.message, 401);
  }
};
export default verifyAllTokens;
