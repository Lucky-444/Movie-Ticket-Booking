import Booking from "../models/Booking.js";
import Show from "../models/Show.js";

//Function to check availability of seats for a particular show
export const checkSeatAvailability = async (showId, selectedSeats) => {
  try {
    const showData = await Show.findById(showId);
    if (!showData) {
      throw new Error("Show not found");
      return false;
    }

    const allOccupiedSeats = showData.occupiedSeats || [];
    const isAvailable = selectedSeats.every(
      (seat) => !allOccupiedSeats.includes(seat)
    );
    return isAvailable;
  } catch (error) {
    console.error("Error checking seat availability:", error, error.message);
    throw error;
  }
};

export const createBooking = async (req, res) => {
  try {
    //find out the User Id
    const { userId } = req.auth;
    const { showId, selectedSeats } = req.body;
    const { origin } = req.headers;

    //check if seats are still available
    const isAvailable = await checkSeatAvailability(showId, selectedSeats);

    if (!isAvailable) {
      return res
        .status(400)
        .json({ success: false, message: "Seats are already booked" });
    }

    //get the show details
    const show = await Show.findById(showId).populate("movie");
    if (!show) {
      return res
        .status(404)
        .json({ success: false, message: "Show not found" });
    }

    //create booking entry in DB
    const newBooking = await Booking.create({
      user: userId,
      show: showId,
      bookedSeats: selectedSeats,
      amount: showData.showPrice * selectedSeats.length,
    });

    //reserve the seats in show model (update occupied seats)
    selectedSeats.forEach((seat) => {
      show.occupiedSeats[seat] = userId;
    });

    show.markModified("occupiedSeats");

    await show.save();

    //stripe payment link creation can be added here
    res.status(200).json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

//Get occupied seats for a show
export const getOccupiedSeats = async (req, res) => {
  try {
    const { showId } = req.params;
    const show = await Show.findById(showId);
    if (!show) {
      return res
        .status(404)
        .json({ success: false, message: "Show not found" });
    }

    const occupiedSeats = Object.keys(show.occupiedSeats);
    return res.json({ success: true, occupiedSeats });
  } catch (error) {
    console.error("Error fetching occupied seats:", error);
    return res.json({
      success: false,
      message: "Error fetching occupied seats",
      error: error.message,
    });
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate("show")
      .populate("user");
    return booking;
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    throw error;
  }
};
