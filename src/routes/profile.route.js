import express from 'express';
import profileController from '../controllers/profile.controller';
import verifyToken from '../middlewares/verify.token.middleware';
import verifyUser from '../middlewares/verify.user.middleware';

const router = express.Router();

router.get('/', verifyToken.headerToken, profileController.viewProfile);
router.patch('/', verifyToken.headerToken, profileController.editProfile);
export default router;
