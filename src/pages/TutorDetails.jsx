import { Link, useLoaderData, useParams } from "react-router";
import UseAuth from "../Auth/UseAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";

const TutorDetails = () => {
  const { user } = UseAuth();
  // const tutor = useLoaderData();
  const [tutor, setTutor] = useState({});
  const { id } = useParams();
  const { userName, description, image, price, language, email, reviewCount } =
    tutor;
  useEffect(() => {
    const fetchData = async () => {
      const token = await getIdToken(user);
      try {
        const res = await axios.get(
          `https://a01-server.vercel.app/tutorDetails/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          setTutor(res.data);
        } else {
          console.log(`token verified error`);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user]);
  const handleBookNow = () => {
    const bookingDetails = {
      userName: userName,
      language: language,
      price: price,
      email: email,
      image: image,
      reviewCount: reviewCount,
      description: description,
      selfBooking: user?.email,
      selfName: user?.displayName,
      selfImage: user?.photoURL,
    };
    axios
      .post("https://a01-server.vercel.app/bookTutor", bookingDetails)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error booking tutor:", error);
      });
  };
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-base-100 py-10 px-2">
      <div className="relative bg-white/90 border border-gray-200 shadow-lg rounded-xl w-full max-w-3xl flex flex-col md:flex-row items-center md:items-start gap-6 p-4 sm:p-6 md:p-8">
        {/* Language Badge */}
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10 border border-blue-200">
          {language}
        </span>
        {/* Avatar */}
        <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center mb-4 md:mb-0">
          <img
            src={image}
            alt={userName}
            className="w-24 h-24 object-cover rounded-full border-2 border-blue-200 shadow-sm"
          />
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
            {userName}
            {reviewCount > 10 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium border border-yellow-200">Top Rated</span>
            )}
          </h2>
          <p className="text-base text-gray-600 mb-1">
            <span className="font-semibold text-blue-500">Language:</span> {language}
          </p>
          <p className="text-base text-gray-600 mb-1">
            <span className="font-semibold text-blue-500">Price:</span> ${price}
          </p>
          <p className="text-base text-gray-600 mb-1">
            <span className="font-semibold text-blue-500">Email:</span> {email}
          </p>
          <p className="text-sm text-gray-500 mb-2">{description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg text-yellow-400">⭐</span>
            <span className="font-semibold text-gray-700 text-sm">{reviewCount || 0} Reviews</span>
          </div>
          <div className="mt-4">
            <Link to={`/myBookedTutors`}>
              <button
                onClick={handleBookNow}
                className="w-full sm:w-auto px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold shadow transition text-base"
              >
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
