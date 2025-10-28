import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies.jsx";
import Favorite from "./pages/Favorite.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import MovieDetails from "./pages/MovieDetails";
import MyBookings from "./pages/MyBookings";
import { Toaster } from "react-hot-toast";
import Layout from "./pages/Admin/Layout.jsx";
import AddShows from "./pages/Admin/AddShows.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import ListShows from "./pages/Admin/ListShows.jsx";
import ListBookings from "./pages/Admin/ListBookings.jsx";

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith("/admin");

  return (
    <>
      <Toaster />

      {!isAdminRoute && <Navbar />}

      {/* Content grows and pushes footer down */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/*" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-shows" element={<AddShows />} />
          <Route path="list-shows" element={<ListShows />} />
          <Route path="list-bookings" element={<ListBookings />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
};

export default App;
