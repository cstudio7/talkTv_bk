import express from 'express';
import userRoute from './user.route';
import profileRoute from './profile.route';
import avatarRoute from './avatar.route';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/profile', profileRoute);
Router.use('/avatar', avatarRoute);
export default Router;
