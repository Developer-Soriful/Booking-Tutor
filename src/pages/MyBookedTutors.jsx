import axios from "axios";
import { useEffect, useState } from "react";
import UseAuth from "../Auth/UseAuth";
import Swal from "sweetalert2";
import { getIdToken } from "firebase/auth";

const MyBookedTutors = () => {
  const [bookedData, setBookedData] = useState([]);
  const { user } = UseAuth();
  useEffect(() => {
    const fetchData = async () => {
      const token = await getIdToken(user);
      try {
        const res = await axios.get(
          `https://a01-server.vercel.app/allBookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          setBookedData(res.data);
          console.log("verify successfully");
        } else {
          console.log("verify failed");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  // this is for handleReview
  const handleReview = (id) => {
    axios
      .patch(`https://a01-server.vercel.app/updateTutor/${id}`, {
        userEmail: user?.email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          fetch(`https://a01-server.vercel.app/allBookings?email=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
              setBookedData(data);
            })
            .catch((err) => console.log(err.message));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "already reviewed",
            footer: '<a href="#">Why do I have this issue?</a>',
          });
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <h2 className="text-3xl  text-center my-10">My Booking Page</h2>

      {bookedData.length > 0 ? (
        bookedData.map((loaderData) => {
          return (
            <div
              key={loaderData._id}
              className="flex flex-col mt-5  justify-center items-center "
            >
              <div className="  flex flex-col lg:flex-row  p-6 rounded-xl shadow-lg lg:w-2/3 border border-gray-300 ">
                <div className="w-full lg:w-1/3 mr-6">
                  <img
                    src={loaderData.image}
                    alt={loaderData.language}
                    className="w-full  object-contain rounded-lg mb-6"
                  />
                </div>
                <div className="w-full lg:w-2/3 flex flex-col justify-between">
                  <h2 className="text-3xl font-bold  mb-2">
                    {loaderData.language}
                  </h2>
                  <p className=" mb-4">Tutor Name: {loaderData.userName}</p>
                  <p className=" text-lg mb-2">Price: ${loaderData.price} </p>
                  <p className=" mb-4">Tutor Email: {loaderData.email}</p>
                  <p className=" mb-4">{loaderData.description}</p>
                  <p className=" mb-4">⭐ : {loaderData.reviewCount}</p>

                  <button
                    onClick={() => handleReview(loaderData._id)}
                    className="px-6 cursor-pointer py-2 bg-red-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center items-center h-full min-h-[60vh] text-2xl text-red-500">
          No Booked Tutors
        </div>
      )}
    </>
  );
};

export default MyBookedTutors;
