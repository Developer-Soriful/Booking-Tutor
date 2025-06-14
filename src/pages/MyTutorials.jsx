import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../Auth/UseAuth";
import { getIdToken } from "firebase/auth";

const MyTutorials = () => {
  const { user } = UseAuth();
  const [tutorials, setMyTutorials] = useState([]);
  // this is for firebase sdk

  useEffect(() => {
    const fetchData = async () => {
      const token = await getIdToken(user);
      try {
        const res = await axios.get(
          `https://a01-server.vercel.app/myAddedTutorials?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data) {
          setMyTutorials(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://a01-server.vercel.app/deleteTutorial/${id}`).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "delete successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      const remainingTutors = tutorials.filter((tutor) => tutor._id !== id);
      setMyTutorials(remainingTutors);
    });
  };
  const handleUpdateClick = (id) => {
    const selected = tutorials.find((tutorial) => tutorial._id === id);

    Swal.fire({
      title: "Update Tutorial",
      html: `
      <div class="swal2-input-group"> 
       <p>userName : ${user.displayName} </p>
       <p>userEmail : ${user.email} </p>
       <p>⭐ : ${selected.rating || 0} </p>
      <input id="swal-image" class="swal2-input" placeholder="Image" value="${
        selected.image
      }">
      <input id="swal-language" class="swal2-input" placeholder="Language" value="${
        selected.language
      }">
      <input id="swal-price" class="swal2-input" placeholder="Price" type="number" value="${
        selected.price
      }">
      <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${
        selected.description
      }</textarea>
      </div>
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: () => {
        const image = document.getElementById("swal-image").value;
        const language = document.getElementById("swal-language").value;
        const price = document.getElementById("swal-price").value;
        const description = document.getElementById("swal-description").value;

        return { image, language, price, description };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedData = {
          image: result.value.image,
          language: result.value.language,
          price: parseFloat(result.value.price),
          description: result.value.description,
        };

        axios
          .put(`https://a01-server.vercel.app/updateTutorialData/${id}`, updatedData)
          .then(() => {
            Swal.fire("Updated!", "Tutorial has been updated.", "success");
            // Refetch the tutorials or update state
            const updatedTutorials = tutorials.map((tutorial) =>
              tutorial._id === id ? { ...tutorial, ...updatedData } : tutorial
            );
            setMyTutorials(updatedTutorials);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Added Tutorials</h2>
      <div className="space-y-4">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border border-gray-500">
            <thead>
              <tr>
                <th className="p-2 border border-gray-500">Image</th>
                <th className="p-2 border border-gray-500">Language</th>
                <th className="p-2 border border-gray-500">Price</th>
                <th className="p-2 border border-gray-500">Description</th>
                <th className="p-2 border border-gray-500">Review</th>
                <th className="p-2 border border-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.length > 0 ? (
                tutorials?.map((item) => (
                  <tr key={item._id} className="border border-gray-500">
                    <td className="p-2 border border-gray-500">
                      <img
                        src={item.image}
                        alt="tutorial"
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="p-2 border border-gray-500">
                      {item.language}
                    </td>
                    <td className="p-2 border border-gray-500">
                      ${item.price}
                    </td>
                    <td className="p-2 border border-gray-500">
                      {item.description}
                    </td>
                    <td className="p-2 border border-gray-500">
                      {item.review}
                    </td>
                    <td className="p-2 border border-gray-500">
                      <div className="flex gap-2">
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                          onClick={() => handleUpdateClick(item._id)}
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="min-h-[70vh] flex items-center justify-center">
                  <td className="text-center ">No tutorials found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Cards */}
        <div className="md:hidden space-y-4 overflow-x-hidden">
          {tutorials?.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl shadow p-4 space-y-2"
            >
              <img
                src={item.image}
                alt={item.language}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-xl font-bold">{item.language}</p>
                <p className=" text-sm">Price: ${item.price}</p>
                <p className=" text-sm">Description: {item.description}</p>
                <p className=" text-sm">Review: {item.review}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
                <button
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => handleUpdateClick(item._id)}
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Update Modal */}
      {/* {showModal && selectedTutorial && (
        <div className="fixed inset-0 bg-black  flex justify-center items-center z-50">
          <div className="bg-blue-400 text-black p-6 rounded-lg shadow-lg w-[90%]  lg:w-1/3 ">
            <h3 className="text-xl font-bold mb-4">Update Tutorial</h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  defaultValue={selectedTutorial.userName}
                  disabled
                  className="w-full border p-2 rounded "
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="text"
                  defaultValue={selectedTutorial.email}
                  disabled
                  className="w-full border p-2 rounded "
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Image</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedTutorial.image}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Language</label>
                <input
                  type="text"
                  name="language"
                  defaultValue={selectedTutorial.language}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedTutorial.price}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedTutorial.description}
                  className="w-full border p-2 rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded mt-3 cursor-pointer"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-500 text-white py-2 rounded mt-2 cursor-pointer"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default MyTutorials;
