import { clerkClient } from "@clerk/express";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";

//to get user Booking
export const getUserBookings = async (req, res) => {
  try {
    const user = req.auth().userId;

    const bookings = await Booking.find({ user: user })
      .populate({
        path: "show",
        populate: {
          path: "movie",
        },
      })
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Server error" });
  }
};

//APi function to add favorite movies in clerk user metadata

export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.auth().userId;

    const user = await clerkClient.users.getUser(userId);

    if (!user.privateMetadata.favorites) {
      user.privateMetadata.favorites = [];
    }

    if (!user.privateMetadata.favorites.includes(movieId)) {
      user.privateMetadata.favorites.push(movieId);
    } else {
      //if already exists , remove from favorites
      user.privateMetadata.favorites = user.privateMetadata.favorites.filter(
        (id) => id !== movieId
      );
    }

    await clerkClient.users.updateUser(userId, {
      privateMetadata: user.privateMetadata,
    });
    res.status(200).json({ message: "Favorite Movies Updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Api function to get favorite movies from clerk user metadata

export const getFavoriteMovies = async (req, res) => {
  try {
    const userId = req.auth().userId;
    const user = await clerkClient.users.getUser(userId);
    const favoriteMovies = user.privateMetadata.favorites || [];

    //get movie details from database if needed
    const movies = await Movie.find({ _id: { $in: favoriteMovies } });


    res.status(200).json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
