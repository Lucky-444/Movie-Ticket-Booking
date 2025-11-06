import express from 'express';
import Show from '../models/Show.js';
import { addMovies, getNowPlayingMovies } from '../controllers/showController.js';
const showRouter = express.Router();
// Route to create a new show
// router.post('/shows', async (req, res) => {
//     try {
//         const { movie, showDateTime, showPrice, availableSeats } = req.body;
//         const newShow = new Show({
//             movie,
//             showDateTime,
//             showPrice,
//             availableSeats
//         });
//         await newShow.save();
//         res.status(201).json(newShow);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create show' });
//     }
// });

// using TMDB API to fetch now playing movies
showRouter.get('/now-playing', getNowPlayingMovies);
showRouter.post('/add', addMovies);




export default showRouter;