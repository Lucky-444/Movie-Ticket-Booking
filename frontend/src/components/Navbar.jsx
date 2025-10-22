import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = useUser();
  const {openSignIn} = useClerk();
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      
      {/* Logo */}
      <Link to='/' className="max-md:flex-1">
        <img src={assets.logo} alt="logo" className="w-48 h-auto" />
      </Link>

      {/* Menu Items */}
      <div
        className={`md:flex md:flex-row md:items-center md:px-8 md:rounded-full md:bg-white/10 md:border md:border-gray-300/20 md:backdrop-blur flex flex-col items-center gap-8 py-3
        max-md:absolute max-md:top-0 max-md:left-0 max-md:h-screen max-md:justify-center max-md:font-medium max-md:text-lg
        max-md:bg-black/70 max-md:backdrop-blur z-50 overflow-hidden transition-all duration-300 ease-in-out
        ${isMenuOpen ? "max-md:w-full" : "max-md:w-0"}`}
      >
        {/* Cross Icon for mobile */}
        {isMenuOpen && (
          <XIcon
            className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer z-50"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Menu Links */}
        <Link 
          to='/' 
          onClick={() => { scrollTo(0, 0); setIsMenuOpen(false); }}
          className="mx-4 font-medium hover:text-primary transition md:mx-4"
        >
          Home
        </Link>
        <Link 
          to='/movies' 
          onClick={() => { scrollTo(0, 0); setIsMenuOpen(false); }}
          className="mx-4 font-medium hover:text-primary transition md:mx-4"
        >
          Movies
        </Link>
        <Link 
          to='/contact' 
          onClick={() => { scrollTo(0, 0); setIsMenuOpen(false); }}
          className="mx-4 font-medium hover:text-primary transition md:mx-4"
        >
          Theaters
        </Link>
        <Link 
          to='/about' 
          onClick={() => { scrollTo(0, 0); setIsMenuOpen(false); }}
          className="mx-4 font-medium hover:text-primary transition md:mx-4"
        >
          Releases
        </Link>
        <Link 
          to='/favorites' 
          onClick={() => { scrollTo(0, 0); setIsMenuOpen(false); }}
          className="mx-4 font-medium hover:text-primary transition md:mx-4"
        >
          Favorites
        </Link>
      </div>

      {/* Search and Login */}
      <div className="flex items-center gap-8">
        <SearchIcon  className="max-md:hidden w-6 h-6 cursor-pointer" />
        { 
          !user ? (
            <button 
              onClick={openSignIn} 
              className="px-4 py-1 sm:px-7 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
            >
              Login
            </button>
          ) : (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action 
                  label="My Bookings" 
                  labelIcon={<TicketPlus width={15} />} 
                  onClick={() => navigate('/my-bookings')} 
                />
              </UserButton.MenuItems>
            </UserButton>
          )
        }
        
      </div>

      {/* Hamburger Icon for mobile */}
      {!isMenuOpen && (
        <MenuIcon 
          className="max-md:ml-4 md:hidden cursor-pointer" 
          onClick={() => setIsMenuOpen(true)} 
        />
      )}
    </div>
  );
};

export default Navbar;
