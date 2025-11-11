import express from 'express';
import Show from '../models/Show.js';
import { addMovies, getNowPlayingMovies } from '../controllers/showController.js';
import { protectAdmin } from '../Middleware/auth.js';
const showRouter = express.Router();

showRouter.get('/now-playing',protectAdmin , getNowPlayingMovies);
showRouter.post('/add', protectAdmin , addMovies);




export default showRouter;