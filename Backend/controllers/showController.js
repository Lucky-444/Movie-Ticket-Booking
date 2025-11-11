import Movie from "../models/Movie.js";
import axios from "axios";
import Show from "../models/Show.js";
// api to get now playing movies from TMDB API
const getNowPlayingMovies = async (req, res) => {
  try {
    //do it 5hr.20mns
    const {data} = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
      },
    });

    const movies = data.results;

    res.status(200).json({ success: true, movies: movies });      
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch now playing movies",
      success: false,
      message: error.message,
    });
  }
};

const addMovies = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;
    let movie = await Movie.findById(movieId);
    if (!movie) {
      //Fetch movie details from TMDB API and save to database
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }),
      ]);
      const movieDetails = movieDetailsResponse.data;
      const movieCredits = movieCreditsResponse.data;
      movie = new Movie({
        _id: movieId,
        title: movieDetails.title,
        overview: movieDetails.overview,
        release_date: movieDetails.release_date,
        poster_path: movieDetails.poster_path,
        backdrop_path: movieDetails.backdrop_path,
        cast: movieCredits.cast,
        genres: movieDetails.genres,
        vote_average: movieDetails.vote_average,
        original_language: movieDetails.original_language,
        tagline: movieDetails.tagline || "",
        runtime: movieDetails.runtime,
      });

      //now save the movie to database
      await movie.save();
    }
    
    const showsToCreate = [];
    showsInput.forEach((show) => {
      const showDate = show.date; // Expecting 'YYYY-MM-DD' format
      show.time.forEach((time) => {
        const dateTimeString = `${showDate}T${time}:00`; // 'YYYY-MM-DDTHH:mm:ss'
        const showDateTime = new Date(dateTimeString);
        showsToCreate.push({
          movie: movieId,
          showDateTime,
          showPrice,
          occupiedSeats : {},
        });
      });
    });

    if(showsToCreate.length > 0){
         await Show.insertMany(showsToCreate);
    }
    //do it 5hr.20mns
    res
      .status(200)
      .json({ success: true, message: "Movies added successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to add movies",
      success: false,
      message: error.message,
    });
  }
};

export { getNowPlayingMovies, addMovies };
