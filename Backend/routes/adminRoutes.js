import express from "express";
import { protectAdmin } from "../Middleware/auth.js";
import { getAllBookings, getDashboardDetails, isAdmin , getAllShows } from "../controllers/adminController.js";


const adminRouter = express.Router();
// Define admin routes here (e.g., managing movies, shows, etc.)
adminRouter.get('/is-admin', protectAdmin , isAdmin);
adminRouter.get('/dashboard', protectAdmin , getDashboardDetails);
adminRouter.get('/all-shows', protectAdmin , getAllShows);
adminRouter.get('/all-bookings', protectAdmin , getAllBookings);




export default adminRouter;