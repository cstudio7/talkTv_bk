import express from 'express';
import InputValidation from '../helpers/Validations/playlist.joi.validate';
import playlistController from "../controllers/playlist.controller";

const {
    validatePlaylist,
} = InputValidation;

const router = express.Router();

router.post('/',  validatePlaylist, playlistController.addPlaylist);
router.get('/',  playlistController.getPublicPlaylist);
router.get('/all',  playlistController.getAllPlaylist);
router.get('/:id',  playlistController.getOnePlaylist);
router.patch('/:id',  playlistController.editPlaylist);
router.delete('/',  playlistController.deletePlaylist);


export default router;
