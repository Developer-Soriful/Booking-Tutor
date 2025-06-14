import { Link, NavLink } from "react-router";
import { Tooltip } from "react-tooltip";
import UseAuth from "../Auth/UseAuth";

const Header = () => {
  const { user } = UseAuth();

  return (
    <div className="flex justify-between items-center  p-4">
      <div className="flex items-center gap-2">
        <img
          className="w-[50px] h-[50px] rounded-full p-1 border"
          src="https://images.unsplash.com/photo-1593882100241-aef1449fe351?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h1>Tutor Booking</h1>
      </div>
      <nav className="flex gap-4">
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
      <div>
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
