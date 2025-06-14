import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import UseAuth from "../Auth/UseAuth";
import { CiMenuBurger } from "react-icons/ci";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Header = () => {
  const { user } = UseAuth();
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState(false);
  const handleMenu = () => {
    setMenu(!menu);
  };
  // this is for handle dark light mode
  const handleMode = () => {
    setMode(!mode);
  };
  // this is handle root design 
  useEffect(() => {
    const theme = mode ? "dark" : "light";
    document.documentElement.setAttribute('data-theme' ,theme )
  }, [mode]
  )

  return (
    <div className="flex justify-between items-center relative p-4">
      <div className="flex items-center gap-2">
        <img
          className="w-[50px] h-[50px] rounded-full p-1 border"
          src="https://images.unsplash.com/photo-1593882100241-aef1449fe351?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <button onClick={handleMenu} className={`cursor-pointer lg:hidden`}>
          <CiMenuBurger size={30} />
        </button>
        <h1 className="hidden lg:block">Tutor Booking</h1>
      </div>
      {menu ? (
        <nav
          className={`flex flex-col absolute top-[55px] z-10 gap-2 bg-blue-200 p-4 rounded-xl shadow-md lg:hidden w-[400px] mx-auto mt-4`}
        >
          {[
            { to: "/", label: "Home" },
            { to: "/findTutors", label: "Find Tutors" },
            { to: "/addTutorials", label: "Add Tutorials" },
            { to: "/myTutorials", label: "My Tutorials" },
            { to: "/myBookedTutors", label: "My Booked Tutors" },
          ].map(({ to, label }) => (
            <NavLink key={to} to={to}>
              {({ isActive }) => (
                <span
                  className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
            ${
              isActive
                ? "bg-blue-500 text-white shadow-md"
                : "hover:bg-blue-200 text-blue-800"
            }`}
                >
                  {label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      ) : (
        ""
      )}

      <nav className=" gap-4 hidden lg:flex ">
        <NavLink to="/">
          {({ isActive }) => (
            <span className={isActive ? "underline text-blue-600" : ""}>
              Home
            </span>
          )}
        </NavLink>
        <NavLink to="/findTutors">
          {({ isActive }) => (
            <span className={isActive ? "underline text-blue-600" : ""}>
              Find tutors
            </span>
          )}
        </NavLink>
        <NavLink to="/addTutorials">
          {({ isActive }) => (
            <span className={isActive ? "underline text-blue-600" : ""}>
              Add Tutorials
            </span>
          )}
        </NavLink>
        <NavLink to="/myTutorials">
          {({ isActive }) => (
            <span className={isActive ? "underline text-blue-600" : ""}>
              My Tutorials
            </span>
          )}
        </NavLink>
        <NavLink to="/myBookedTutors">
          {({ isActive }) => (
            <span className={isActive ? "underline text-blue-600" : ""}>
              My booked tutors
            </span>
          )}
        </NavLink>
      </nav>
      <div className="flex justify-center items-center gap-5">
        <button onClick={handleMode} className="text-2xl cursor-pointer">{mode ? <MdDarkMode /> : <MdLightMode />}</button>
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to={`/profile`}
              data-tooltip-id="my-tooltip"
              data-tooltip-content={`${user.displayName || "User"}`}
              data-tooltip-place="bottom"
            >
              <img
                className="w-[50px] h-[50px] rounded-full p-1 border"
                src={user.photoURL}
                alt=""
              />
            </Link>
            <Tooltip id="my-tooltip" />
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="bg-white text-blue-500 cursor-pointer px-4 py-2 rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
