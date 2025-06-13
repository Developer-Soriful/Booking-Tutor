import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../Auth/UseAuth";

const AddTutors = () => {
  const { user } = UseAuth();
  // this is for firebase sdk
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const tutorialData = Object.fromEntries(formData.entries());
    tutorialData.email = user?.email;
    tutorialData.userName = user?.displayName;
    tutorialData.reviewCount = 0;
    axios
      .post(`http://localhost:3000/addTutor`, tutorialData)
      .then((response) => {
        if (response.data.insertedId) {
          navigate(`/findTutors/${tutorialData.language}`);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="max-w-xl mx-auto shadow-md p-6 rounded-xl ">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Tutorial</h2>
      <form onSubmit={handleSubmit} className="">
        <div className="flex justify-between mb-4 text-xl text-gray-400">
          <p>{user.displayName}</p>
          <p>{user.email}</p>
        </div>
        <div>
          <label className="font-medium">Tutorial Image URL</label>
          <input
            type="text"
            name="image"
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="font-medium">Language</label>
          <input
            type="text"
            name="language"
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            className="w-full textarea textarea-bordered"
            required
          ></textarea>
        </div>

        <div>
          <label className="font-medium">Review</label>
          <input
            type="number"
            name="review"
            disabled
            className="w-full input input-bordered"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Add Tutorial
        </button>
      </form>
    </div>
  );
};

export default AddTutors;
