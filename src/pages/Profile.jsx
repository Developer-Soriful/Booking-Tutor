import { Link } from "react-router";
import UseAuth from "../Auth/UseAuth";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Profile = () => {
  const { user, logoutUser } = UseAuth();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[70vh]">
      <div className="flex items-start justify-left w-full ml-10">
        <Link to={`/`} className="btn btn-outline btn-accent ">
          <span className="mr-2">Back to Home</span>
          <FaArrowAltCircleLeft />
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
      <p className="text-lg">
        This is the profile page where user details will be displayed.
      </p>
      <div className="flex  items-center gap-6 shadow-lg w-96 p-6 bg-base-200 rounded-lg ">
        <div className="">
          <h2 className="text-2xl font-semibold mb-4">User Information</h2>
          <p className="mb-2">Name: {user.displayName || "User"}</p>
          <p className="mb-2">Email: {user.email || "N/A"}</p>
        </div>
        <div>
          <img
            className="w-[50px] h-[50px] rounded-full p-1 border mt-4"
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="User Profile"
          />
        </div>
      </div>
      <div className="flex items-center justify-between w-96 mt-4">
        <p className="text-lg font-semibold">Want to Logout?</p>
        <span>------</span>
        <button className="btn btn-outline btn-accent" onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Profile;
