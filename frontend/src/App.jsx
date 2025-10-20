import React from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import {Route,  Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies.jsx'
import Favorite from './pages/Favorite.jsx'
import SeatLayout from './pages/SeatLayout.jsx'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import { Toaster } from 'react-hot-toast'
const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');
  return (
    <>
      <Toaster />
     {!isAdminRoute && <Navbar />}
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/movies/:id/:date" element={<SeatLayout />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
     {!isAdminRoute && <Footer />}

    </>
  )
}

export default App
