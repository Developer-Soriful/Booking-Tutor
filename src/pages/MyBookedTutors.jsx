import axios from "axios";
import { useEffect, useState } from "react";
import UseAuth from "../Auth/UseAuth";
import Swal from "sweetalert2";
import { getIdToken } from "firebase/auth";
import { FaStar, FaUser, FaEnvelope, FaDollarSign, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaHeart, FaBookmark, FaShare, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdRateReview, MdSchedule, MdVerified } from "react-icons/md";

const MyBookedTutors = () => {
  const [bookedData, setBookedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    totalSpent: 0,
    avgRating: 0
  });
  const { user } = UseAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const token = await getIdToken(user);
        const res = await axios.get(
          `https://a01-server.vercel.app/allBookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data) {
          setBookedData(res.data);
          
          // Calculate stats
          const total = res.data.length;
          const totalSpent = res.data.reduce((sum, booking) => sum + (booking.price || 0), 0);
          const avgRating = res.data.length > 0 
            ? res.data.reduce((sum, booking) => sum + (booking.reviewCount || 0), 0) / res.data.length 
            : 0;
          
          setStats({ total, totalSpent, avgRating });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Failed to load bookings",
          text: "Please try again later",
          confirmButtonColor: "#3B82F6"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleReview = (id, tutorName) => {
    Swal.fire({
      title: `Review ${tutorName}`,
      html: `
        <div class="space-y-4">
          <div class="text-center">
            <p class="text-gray-600 mb-4">How would you rate your experience with ${tutorName}?</p>
            <div class="flex justify-center space-x-2 text-2xl">
              <span class="cursor-pointer hover:text-yellow-400 transition-colors" onclick="setRating(1)">⭐</span>
              <span class="cursor-pointer hover:text-yellow-400 transition-colors" onclick="setRating(2)">⭐</span>
              <span class="cursor-pointer hover:text-yellow-400 transition-colors" onclick="setRating(3)">⭐</span>
              <span class="cursor-pointer hover:text-yellow-400 transition-colors" onclick="setRating(4)">⭐</span>
              <span class="cursor-pointer hover:text-yellow-400 transition-colors" onclick="setRating(5)">⭐</span>
            </div>
          </div>
          <textarea id="review-comment" class="swal2-textarea" placeholder="Share your experience (optional)"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Submit Review",
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#6B7280",
      preConfirm: () => {
        const rating = window.selectedRating || 5;
        const comment = document.getElementById('review-comment').value;
        return { rating, comment };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`https://a01-server.vercel.app/updateTutor/${id}`, {
            userEmail: user?.email,
            rating: result.value.rating,
            comment: result.value.comment
          })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: "Review Submitted!",
                text: "Thank you for your feedback.",
                confirmButtonColor: "#3B82F6"
              });
              // Refresh data
              fetch(`https://a01-server.vercel.app/allBookings?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                  setBookedData(data);
                })
                .catch((err) => console.log(err.message));
            } else {
              Swal.fire({
                icon: "warning",
                title: "Already Reviewed",
                text: "You have already reviewed this tutor.",
                confirmButtonColor: "#3B82F6"
              });
            }
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              icon: "error",
              title: "Review Failed",
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
          <p className="mt-4 text-base-content/70">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">My Booked Tutors</h1>
            <p className="text-base-content/70">Track your learning journey and manage your sessions</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FaBookmark className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-base-content/70 text-sm">Total Bookings</p>
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
                  <p className="text-base-content/70 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-base-content">${stats.totalSpent}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <FaStar className="text-accent text-xl" />
                </div>
                <div>
                  <p className="text-base-content/70 text-sm">Avg Rating Given</p>
                  <p className="text-2xl font-bold text-base-content">{stats.avgRating.toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Grid - Timeline Style */}
          {bookedData.length > 0 ? (
            <div className="space-y-6">
              {bookedData.map((booking, index) => (
                <div key={booking._id} className="relative">
                  {/* Timeline Connector */}
                  {index < bookedData.length - 1 && (
                    <div className="absolute left-8 top-24 w-0.5 h-16 bg-gradient-to-b from-primary to-secondary z-0"></div>
                  )}
                  
                  <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden hover:shadow-3xl transition-all duration-500 group relative z-10">
                    {/* Header with Gradient */}
                    <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-6 border-b border-base-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                              <span className="text-2xl font-bold text-primary-content">
                                {booking.language?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                              <FaCheckCircle className="text-success-content text-xs" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-base-content">{booking.language}</h3>
                            <p className="text-base-content/70">Learning Session</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-success flex items-center gap-1">
                            <FaDollarSign />
                            {booking.price}
                          </div>
                          <p className="text-sm text-base-content/50">per hour</p>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Tutor Profile Section */}
                        <div className="lg:col-span-1">
                          <div className="bg-gradient-to-br from-base-200 to-base-300 rounded-2xl p-4">
                            <div className="text-center mb-4">
                              <img
                                src={booking.image}
                                alt={booking.userName}
                                className="w-20 h-20 rounded-full border-4 border-primary/30 mx-auto mb-3 shadow-lg"
                              />
                              <h4 className="text-lg font-bold text-base-content flex items-center justify-center gap-2">
                                {booking.userName}
                                <MdVerified className="text-success" />
                              </h4>
                              <p className="text-sm text-base-content/70">{booking.email}</p>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-base-content/70">Experience</span>
                                <span className="font-semibold text-primary">5+ years</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-base-content/70">Students</span>
                                <span className="font-semibold text-secondary">{Math.floor(Math.random() * 100) + 50}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-base-content/70">Rating</span>
                                <span className="font-semibold text-accent flex items-center gap-1">
                                  <FaStar />
                                  {booking.reviewCount || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Session Details */}
                        <div className="lg:col-span-2">
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-semibold text-base-content mb-2 flex items-center gap-2">
                                <FaBookmark className="text-primary" />
                                Session Details
                              </h5>
                              <p className="text-base-content/70 leading-relaxed">
                                {booking.description}
                              </p>
                            </div>

                            {/* Session Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div className="bg-primary/10 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                  #{Math.floor(Math.random() * 10) + 1}
                                </div>
                                <div className="text-xs text-base-content/70">Session</div>
                              </div>
                              <div className="bg-secondary/10 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-secondary mb-1">1h</div>
                                <div className="text-xs text-base-content/70">Duration</div>
                              </div>
                              <div className="bg-accent/10 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-accent mb-1">
                                  {Math.floor(Math.random() * 20) + 10}
                                </div>
                                <div className="text-xs text-base-content/70">Topics</div>
                              </div>
                              <div className="bg-success/10 rounded-xl p-3 text-center">
                                <div className="text-2xl font-bold text-success mb-1">
                                  {Math.floor(Math.random() * 5) + 1}
                                </div>
                                <div className="text-xs text-base-content/70">Progress</div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                              <button
                                className="btn btn-primary flex-1 gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                                onClick={() => handleReview(booking._id, booking.userName)}
                              >
                                <MdRateReview className="text-lg" />
                                <span>Rate Session</span>
                              </button>
                              <button className="btn btn-outline btn-secondary flex-1 gap-2 hover:shadow-lg transition-all duration-300">
                                <FaPhone />
                                <span>Contact Tutor</span>
                              </button>
                              <button className="btn btn-circle btn-outline hover:btn-accent transition-all duration-300">
                                <FaShare />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBookmark className="text-4xl text-base-content/30" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">No Bookings Yet</h3>
              <p className="text-base-content/70 mb-6 max-w-md mx-auto">
                Start your learning journey by booking your first tutor. Explore our expert tutors and find the perfect match for your goals!
              </p>
              <button className="btn btn-primary gap-2">
                <FaHeart />
                Find Tutors
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookedTutors;
