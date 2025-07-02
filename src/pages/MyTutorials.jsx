import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UseAuth from "../Auth/UseAuth";
import { getIdToken } from "firebase/auth";
import { FaEdit, FaTrash, FaStar, FaDollarSign, FaLanguage, FaImage, FaFileAlt, FaPlus, FaEye, FaUsers, FaChartLine } from "react-icons/fa";
import { Link } from "react-router";

const MyTutorials = () => {
  const { user } = UseAuth();
  const [tutorials, setMyTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    totalEarnings: 0,
    avgRating: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const token = await getIdToken(user);
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
          // Calculate stats
          const total = res.data.length;
          const totalEarnings = res.data.reduce((sum, tutorial) => sum + (tutorial.price || 0), 0);
          const avgRating = res.data.length > 0 
            ? res.data.reduce((sum, tutorial) => sum + (tutorial.review || 0), 0) / res.data.length 
            : 0;
          
          setStats({ total, totalEarnings, avgRating });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Failed to load tutorials",
          text: "Please try again later",
          confirmButtonColor: "#3B82F6"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleDelete = (id, language) => {
    Swal.fire({
      title: "Delete Tutorial?",
      text: `Are you sure you want to delete "${language}" tutorial? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://a01-server.vercel.app/deleteTutorial/${id}`).then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Tutorial Deleted!",
            text: "Your tutorial has been successfully removed.",
            showConfirmButton: false,
            timer: 2000,
            background: "#1F2937",
            color: "#F9FAFB"
          });
          const remainingTutors = tutorials.filter((tutor) => tutor._id !== id);
          setMyTutorials(remainingTutors);
          // Update stats
          setStats(prev => ({
            ...prev,
            total: prev.total - 1,
            totalEarnings: prev.totalEarnings - (tutorials.find(t => t._id === id)?.price || 0)
          }));
        }).catch(() => {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Something went wrong. Please try again.",
            confirmButtonColor: "#3B82F6"
          });
        });
      }
    });
  };

  const handleUpdateClick = (id) => {
    const selected = tutorials.find((tutorial) => tutorial._id === id);

    Swal.fire({
      title: "Update Tutorial",
      html: `
        <div class="space-y-4 text-left">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold text-gray-700">Tutor: ${user.displayName}</p>
            <p class="text-gray-600">Email: ${user.email}</p>
            <p class="text-yellow-600">⭐ Rating: ${selected.rating || 0}</p>
          </div>
          <input id="swal-image" class="swal2-input" placeholder="Image URL" value="${selected.image}">
          <input id="swal-language" class="swal2-input" placeholder="Language/Subject" value="${selected.language}">
          <input id="swal-price" class="swal2-input" placeholder="Price per hour" type="number" value="${selected.price}">
          <textarea id="swal-description" class="swal2-textarea" placeholder="Description" rows="3">${selected.description}</textarea>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update Tutorial",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      preConfirm: () => {
        const image = document.getElementById("swal-image").value;
        const language = document.getElementById("swal-language").value;
        const price = document.getElementById("swal-price").value;
        const description = document.getElementById("swal-description").value;

        if (!image || !language || !price || !description) {
          Swal.showValidationMessage("All fields are required");
          return false;
        }

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
            Swal.fire({
              icon: "success",
              title: "Updated Successfully!",
              text: "Your tutorial has been updated.",
              confirmButtonColor: "#3B82F6"
            });
            const updatedTutorials = tutorials.map((tutorial) =>
              tutorial._id === id ? { ...tutorial, ...updatedData } : tutorial
            );
            setMyTutorials(updatedTutorials);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Update Failed",
              text: "Something went wrong. Please try again.",
              confirmButtonColor: "#3B82F6"
            });
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-base-content/70">Loading your tutorials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">My Tutorials</h1>
              <p className="text-base-content/70">Manage and track your teaching services</p>
            </div>
            <Link to="/addTutorials" className="btn btn-primary gap-2 mt-4 md:mt-0">
              <FaPlus />
              Add New Tutorial
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FaFileAlt className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-base-content/70 text-sm">Total Tutorials</p>
                  <p className="text-2xl font-bold text-base-content">{stats.total}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <FaDollarSign className="text-success text-xl" />
                </div>
                <div>
                  <p className="text-base-content/70 text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-base-content">${stats.totalEarnings}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <FaStar className="text-accent text-xl" />
                </div>
                <div>
                  <p className="text-base-content/70 text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold text-base-content">{stats.avgRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorials Grid */}
          {tutorials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tutorials.map((tutorial) => (
                <div key={tutorial._id} className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden hover:shadow-2xl transition-all duration-300 group h-[500px] flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={tutorial.image}
                      alt={tutorial.language}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-primary badge-sm font-semibold backdrop-blur-sm">
                        <FaLanguage className="mr-1" />
                        {tutorial.language}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="badge badge-secondary badge-sm backdrop-blur-sm">
                        <FaStar className="mr-1" />
                        {tutorial.review || 0}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-base-100/90 backdrop-blur-sm rounded-lg p-2 text-center">
                        <div className="text-2xl font-bold text-success flex items-center justify-center gap-1">
                          <FaDollarSign className="text-sm" />
                          {tutorial.price}
                          <span className="text-xs text-base-content/70">/hour</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-1">{tutorial.language}</h3>
                      <p className="text-base-content/70 text-sm line-clamp-3 leading-relaxed">
                        {tutorial.description}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between mb-4 text-xs text-base-content/50 bg-base-200/50 rounded-lg p-2">
                      <span className="flex items-center gap-1">
                        <FaUsers className="text-primary" />
                        <span>{Math.floor(Math.random() * 50) + 10}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaChartLine className="text-secondary" />
                        <span>{Math.floor(Math.random() * 20) + 5}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-accent" />
                        <span>{tutorial.review || 0}</span>
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="btn btn-outline btn-sm flex-1 gap-2 hover:btn-primary transition-all duration-300"
                        onClick={() => handleUpdateClick(tutorial._id)}
                      >
                        <FaEdit />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        className="btn btn-outline btn-error btn-sm flex-1 gap-2 hover:btn-error transition-all duration-300"
                        onClick={() => handleDelete(tutorial._id, tutorial.language)}
                      >
                        <FaTrash />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaFileAlt className="text-4xl text-base-content/30" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">No Tutorials Yet</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Start sharing your knowledge by creating your first tutorial. Help students learn and grow!
              </p>
              <Link to="/addTutorials" className="btn btn-primary gap-2">
                <FaPlus />
                Create Your First Tutorial
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTutorials;
