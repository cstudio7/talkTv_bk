import express from 'express';
import userRoute from './user.route';
import playlistRoute from './playlist.route';
import profileRoute from './profile.route';
import avatarRoute from './avatar.route';

const Router = express.Router();
Router.use('/auth', userRoute);
Router.use('/profile', profileRoute);
Router.use('/playlist', playlistRoute);
Router.use('/avatar', avatarRoute);
export default Router;
