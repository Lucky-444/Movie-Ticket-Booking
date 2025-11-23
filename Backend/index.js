import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import cors from 'cors' ;
import connectDB from "./config/db.js"
import { clerkMiddleware } from "@clerk/express";
import showRouter from './routes/showRoutes.js' ;
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";


const app = express();

//  Correctly read PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

//  Optional middleware (needed if you plan to parse JSON bodies)
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

await connectDB();
//call connectDB function Here
//  Sample route (you can remove later)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.use('/api/inngest' , serve({client : inngest , functions}));

app.use('/api/shows' ,  showRouter);
app.use('/api/bookings' ,  bookingRouter);

app.use('/api/admin' ,  adminRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
