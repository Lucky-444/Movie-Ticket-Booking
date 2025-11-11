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

// Api To get all shows from DB
const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({showDateTime : {$gte: new Date()}}).populate('movie').sort({ showDateTime: 1 });

    //filter Unique movies only
    // const uniqueShowsMap = new Map();
    // shows.forEach((show) => {
    //   if (!uniqueShowsMap.has(show.movie._id.toString())) {
    //     uniqueShowsMap.set(show.movie._id.toString(), show);
    //   }
    // });


    const uniqueShows = new Set(shows.map(show => show.movie));

    res.status(200).json({ success: true, shows : Array.from(uniqueShows) });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch shows",
      success: false,
      message: error.message,
    });
  }
};

//api to get single shows from DB
const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    //get all upcoming shows for this movie
    const shows = await Show.find({ movie: movieId , showDateTime : {$gte: new Date()}  })

    const movie = await Movie.findById(movieId);

    if(!movie){
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    const dateTime = {};

    shows.forEach((show) => {
      const dateKey = show.showDateTime.toISOString().split('T')[0]; // 'YYYY-MM-DD'

      if (!dateTime[dateKey]) {
        dateTime[dateKey] = [];
      }
      dateTime[dateKey].push({
        time : show.showDateTime,
        showId : show._id,
        showPrice : show.showPrice,
      });
    });

    res.status(200).json({ success: true, dateTime, movie });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch show",
      success: false,
      message: error.message,
    });
  }
};








export { getNowPlayingMovies, addMovies , getAllShows , getShow };
