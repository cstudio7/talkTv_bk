import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import userController from '../controllers/user.controller';

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL
} = process.env;
passport.use(new GoogleStrategy({
  callbackURL: `${BASE_URL}/api/v1/auth/google/redirect`,
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  googleFields: ['emails', 'firstName', 'lastName'],
}, userController.googleAndFacebookPlusAuth));

