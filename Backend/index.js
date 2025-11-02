import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

//  Correctly read PORT from .env or fallback to 5000
const PORT = process.env.PORT || 5000;

//  Optional middleware (needed if you plan to parse JSON bodies)
app.use(express.json());
app.use(cors());

//  Sample route (you can remove later)
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
