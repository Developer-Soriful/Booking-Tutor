import axios from "axios";
import { useEffect, useState } from "react";
import UseAuth from "../Auth/UseAuth";
import Swal from "sweetalert2";

const MyBookedTutors = () => {
  const [bookedData, setBookedData] = useState([]);
  const { user } = UseAuth();
  useEffect(() => {
    fetch(`http://localhost:3000/allBookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookedData(data);
      })
      .catch((err) => console.log(err));
  }, []);
  // this is for handleReview
  const handleReview = (id) => {
    axios
      .patch(`http://localhost:3000/updateTutor/${id}`, {
        userEmail: user?.email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          fetch(`http://localhost:3000/allBookings?email=${user.email}`)
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
              <div className="  flex  p-6 rounded-xl shadow-lg lg:w-2/3 border border-gray-300 ">
                <div className="w-1/3 mr-6">
                  <img
                    src={loaderData.image}
                    alt={loaderData.language}
                    className="w-full h-64 object-contain rounded-lg mb-6"
                  />
                </div>
                <div className="w-2/3 flex flex-col justify-between">
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
