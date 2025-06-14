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
    <div className="flex  justify-center items-center min-h-[70vh]">
      <div className="  flex mt-10 p-6 rounded-xl shadow-lg lg:w-2/3 border border-gray-300">
        <div className="w-1/3 mr-6">
          <img
            src={image}
            alt={language}
            className="w-full h-64 object-contain rounded-lg mb-6"
          />
        </div>
        <div className="w-2/3 flex flex-col justify-between">
          <h2 className="text-3xl font-bold  mb-2">{language}</h2>
          <p className=" mb-4">Tutor Name: {userName}</p>
          <p className=" text-lg mb-2">Price: ${price} </p>
          <p className=" mb-4">Tutor Email: {email}</p>
          <p className=" mb-4">{description}</p>
          <p className=" mb-4">⭐ : {reviewCount}</p>
          <div>
            <Link to={`/myBookedTutors`}>
              <button
                onClick={handleBookNow}
                className="px-6 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
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
