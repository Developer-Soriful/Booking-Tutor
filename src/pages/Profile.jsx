import { Link } from "react-router";
import UseAuth from "../Auth/UseAuth";
import { FaArrowAltCircleLeft, FaUserCheck, FaEnvelope, FaUserEdit, FaSignOutAlt, FaStar, FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

const Profile = () => {
  const { user, logoutUser } = UseAuth();
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden py-12">
      {/* Background Blurs */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-primary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-10"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-accent rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-lg mx-auto z-10 relative">
        {/* Back Button */}
        <div className="mb-6 flex items-center">
          <Link to={`/`} className="btn btn-outline btn-accent flex items-center gap-2">
            <FaArrowAltCircleLeft />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-base-100/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-base-300 p-8 flex flex-col items-center gap-6 relative">
          {/* Avatar & Badge */}
          <div className="relative mb-2">
            <img
              className="w-28 h-28 rounded-full border-4 border-primary shadow-lg object-cover"
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
            />
            <span className="absolute bottom-2 right-2 bg-success text-success-content rounded-full p-2 shadow-lg border-2 border-base-100">
              <FaUserCheck className="text-lg" title="Verified" />
            </span>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-base-content flex items-center gap-2">
              {user.displayName || "User"}
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold ml-2">Premium</span>
            </h1>
            <p className="text-base-content/70 flex items-center gap-2 mt-1">
              <FaEnvelope className="text-primary" />
              {user.email || "N/A"}
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex justify-center gap-8 mt-6 w-full">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-primary">12</span>
              <span className="text-xs text-base-content/60 flex items-center gap-1"><FaBookOpen /> Tutorials</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-secondary">5</span>
              <span className="text-xs text-base-content/60 flex items-center gap-1"><FaChalkboardTeacher /> Bookings</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-accent">4.8</span>
              <span className="text-xs text-base-content/60 flex items-center gap-1"><FaStar /> Reviews</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 w-full justify-center">
            <button className="btn btn-primary btn-outline flex items-center gap-2 font-semibold">
              <FaUserEdit /> Edit Profile
            </button>
            <button className="btn btn-accent flex items-center gap-2 font-semibold" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
