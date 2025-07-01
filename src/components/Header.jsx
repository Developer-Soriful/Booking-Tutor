import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import UseAuth from "../Auth/UseAuth";
import { CiMenuBurger } from "react-icons/ci";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

const Header = () => {
  const { user } = UseAuth();
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleMenu = () => {
    setMenu(!menu);
  };
  
  // this is for handle dark light mode
  const handleMode = () => {
    setMode(!mode);
  };
  
  // this handle root design 
  useEffect(() => {
    const theme = mode ? "dark" : "light";
    document.documentElement.setAttribute('data-theme' ,theme )
  }, [mode])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-base-100/70 backdrop-blur-2xl border-b border-base-300 shadow-2xl' 
          : 'bg-base-100/95 backdrop-blur-xl border-b border-base-300'
      }`}>
        <div className="flex justify-between items-center relative p-4 w-11/12 mx-auto">
          <div className="flex items-center gap-2">
            <img
              className="w-[50px] h-[50px] p-1 rounded-lg bg-primary/10"
              src="/logo.png"
              alt="Tutor Booking Logo"
            />
            <button onClick={handleMenu} className={`cursor-pointer lg:hidden p-2 rounded-lg hover:bg-base-200 transition-all duration-300 ${menu ? 'bg-base-200' : ''}`}>
              {menu ? <FaTimes size={24} className="text-base-content" /> : <CiMenuBurger size={24} className="text-base-content" />}
            </button>
            <h1 className="hidden lg:block text-xl font-bold text-base-content">Tutor Booking</h1>
          </div>
          
          {/* Mobile Menu with Animation */}
          {menu && (
            <div className="absolute top-full left-0 right-0 z-50 bg-base-100/80 backdrop-blur-2xl border-b border-base-300 shadow-2xl lg:hidden">
              <nav className="flex flex-col p-4 space-y-2 animate-slideDown">
                {[
                  { to: "/", label: "Home" },
                  { to: "/findTutors", label: "Find Tutors" },
                  { to: "/addTutorials", label: "Add Tutorials" },
                  { to: "/myTutorials", label: "My Tutorials" },
                  { to: "/myBookedTutors", label: "My Booked Tutors" },
                ].map(({ to, label }) => (
                  <NavLink key={to} to={to} onClick={() => setMenu(false)}>
                    {({ isActive }) => (
                      <span
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105
                        ${
                          isActive
                            ? "bg-primary text-primary-content shadow-md"
                            : "hover:bg-base-200 text-base-content"
                        }`}
                      >
                        {label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="gap-6 hidden lg:flex">
            <NavLink to="/">
              {({ isActive }) => (
                <span className={`transition-all duration-300 hover:text-primary ${isActive ? "text-primary font-semibold" : "text-base-content"}`}>
                  Home
                </span>
              )}
            </NavLink>
            <NavLink to="/findTutors">
              {({ isActive }) => (
                <span className={`transition-all duration-300 hover:text-primary ${isActive ? "text-primary font-semibold" : "text-base-content"}`}>
                  Find Tutors
                </span>
              )}
            </NavLink>
            <NavLink to="/addTutorials">
              {({ isActive }) => (
                <span className={`transition-all duration-300 hover:text-primary ${isActive ? "text-primary font-semibold" : "text-base-content"}`}>
                  Add Tutorials
                </span>
              )}
            </NavLink>
            <NavLink to="/myTutorials">
              {({ isActive }) => (
                <span className={`transition-all duration-300 hover:text-primary ${isActive ? "text-primary font-semibold" : "text-base-content"}`}>
                  My Tutorials
                </span>
              )}
            </NavLink>
            <NavLink to="/myBookedTutors">
              {({ isActive }) => (
                <span className={`transition-all duration-300 hover:text-primary ${isActive ? "text-primary font-semibold" : "text-base-content"}`}>
                  My Booked Tutors
                </span>
              )}
            </NavLink>
          </nav>
          
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={handleMode} 
              className="text-2xl cursor-pointer p-2 rounded-lg hover:bg-base-200 transition-all duration-300"
            >
              {mode ? <MdDarkMode className="text-base-content" /> : <MdLightMode className="text-base-content" />}
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to={`/profile`}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={`${user.displayName || "User"}`}
                  data-tooltip-place="bottom"
                  className="p-1 rounded-full hover:bg-base-200 transition-all duration-300"
                >
                  <img
                    className="w-[50px] h-[50px] rounded-full border-2 border-primary/30 hover:border-primary transition-all duration-300"
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                  />
                </Link>
                <Tooltip id="my-tooltip" />
              </div>
            ) : (
              <Link to={"/login"}>
                <button className="bg-primary text-primary-content cursor-pointer px-6 py-2 rounded-lg hover:bg-primary-focus transition-all duration-300 font-medium">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
