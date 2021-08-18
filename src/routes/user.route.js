import express from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller';
import InputValidation from '../helpers/Validations/users.joi.validate';
// import '../config/passport.config';

const {
    validateSignup,
    validateLogin,
    validateResetPassword,
    validateGoogleSignUp,
} = InputValidation;

const router = express.Router();

router.post('/signup', validateSignup, userController.signup);
router.post('/signin', validateLogin, userController.signIn);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/google', session: false }), userController.authGoogleAndFacebook);


export default router;
