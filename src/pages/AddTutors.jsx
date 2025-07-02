import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import UseAuth from "../Auth/UseAuth";
import { useEffect, useState } from "react";
import { getIdToken } from "firebase/auth";
import { FaUser, FaEnvelope, FaImage, FaLanguage, FaDollarSign, FaFileAlt, FaStar, FaPlus, FaArrowLeft, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router";

const AddTutors = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    language: "",
    price: "",
    description: "",
    review: 0
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "Please login to add a tutorial",
        confirmButtonColor: "#3B82F6"
      });
      return;
    }

    setLoading(true);
    try {
      const token = await getIdToken(user);
      const tutorialData = {
        ...formData,
        email: user?.email,
        userName: user?.displayName,
        reviewCount: 0
      };

      const res = await axios.post(
        `https://a01-server.vercel.app/addTutor`,
        tutorialData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.data) {
        navigate(`/findTutors/${tutorialData.language}`);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tutorial Added Successfully!",
          text: "Your tutorial has been published and is now visible to students.",
          showConfirmButton: false,
          timer: 2000,
          background: "#1F2937",
          color: "#F9FAFB",
          confirmButtonColor: "#3B82F6"
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Tutorial",
        text: "Please try again or check your connection.",
        confirmButtonColor: "#3B82F6"
      });
    } finally {
      setLoading(false);
    }
  };

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Progress */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              to="/findTutors" 
              className="btn btn-ghost btn-sm gap-2 hover:bg-base-200 transition-all"
            >
              <FaArrowLeft className="text-base-content" />
              <span className="hidden sm:inline">Back to Tutors</span>
            </Link>
            <div className="text-right">
              <h1 className="text-2xl md:text-3xl font-bold text-base-content">Create Your Tutorial</h1>
              <p className="text-base-content/60 text-sm">Share your knowledge with students worldwide</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-base-200 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500" style={{width: '60%'}}></div>
          </div>
          <p className="text-xs text-base-content/50 text-center">Step 3 of 5: Tutorial Details</p>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto">
          {/* User Profile Banner */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user.photoURL || "https://via.placeholder.com/60"}
                  alt={user.displayName}
                  className="w-16 h-16 rounded-full border-3 border-primary/30 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-success-content rounded-full"></div>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                  <FaUser className="text-primary" />
                  {user.displayName}
                </h3>
                <p className="text-base-content/70 flex items-center gap-2">
                  <FaEnvelope className="text-primary/70" />
                  {user.email}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="badge badge-primary badge-sm">Verified Tutor</span>
                  <span className="text-xs text-base-content/50">Ready to teach!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-base-300">
              <h2 className="text-xl font-bold text-base-content flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <FaPlus className="text-primary-content text-sm" />
                </div>
                Tutorial Information
              </h2>
              <p className="text-base-content/70 mt-2">Tell students about your expertise and teaching style</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image URL with Preview */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-semibold flex items-center gap-2">
                    <FaImage className="text-primary" />
                    Profile Image
                  </span>
                  <span className="label-text-alt text-error">* Required</span>
                </label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                                         <input
                       type="url"
                       name="image"
                       value={formData.image}
                       onChange={handleInputChange}
                       className="input input-bordered w-full bg-base-100 border-3 border-base-300 text-base-content placeholder-base-content/50 focus:border-primary focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm"
                       placeholder="https://your-image-url.com/profile.jpg"
                       required
                     />
                    <label className="label">
                      <span className="label-text-alt text-base-content/50">Use a professional, high-quality image</span>
                    </label>
                  </div>
                  {formData.image && (
                    <div className="w-20 h-20 rounded-lg border-2 border-base-300 overflow-hidden bg-base-200 flex items-center justify-center">
                      <img 
                        src={formData.image} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Language Selection */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-semibold flex items-center gap-2">
                    <FaLanguage className="text-primary" />
                    What do you teach?
                  </span>
                  <span className="label-text-alt text-error">* Required</span>
                </label>
                                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="input input-bordered w-full bg-base-100 border-3 border-base-300 text-base-content placeholder-base-content/50 focus:border-primary focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm"
                    placeholder="e.g., JavaScript, Python, English, Spanish, Math"
                    required
                  />
                <label className="label">
                  <span className="label-text-alt text-base-content/50">Be specific about your subject or language</span>
                </label>
              </div>

              {/* Price with Suggestions */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-semibold flex items-center gap-2">
                    <FaDollarSign className="text-primary" />
                    Your Hourly Rate
                  </span>
                  <span className="label-text-alt text-error">* Required</span>
                </label>
                <div className="relative">
                                     <input
                     type="number"
                     name="price"
                     value={formData.price}
                     onChange={handleInputChange}
                     className="input input-bordered w-full pl-8 bg-base-100 border-3 border-base-300 text-base-content placeholder-base-content/50 focus:border-primary focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-sm"
                     placeholder="25"
                     min="1"
                     required
                   />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50">$</span>
                </div>
                <label className="label">
                  <span className="label-text-alt text-base-content/50">Competitive rates: $15-50/hour for most subjects</span>
                </label>
              </div>

              {/* Description with Character Count */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content font-semibold flex items-center gap-2">
                    <FaFileAlt className="text-primary" />
                    About Your Teaching
                  </span>
                  <span className="label-text-alt text-error">* Required</span>
                </label>
                                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="textarea textarea-bordered w-full bg-base-100 border-3 border-base-300 text-base-content placeholder-base-content/50 focus:border-primary focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none shadow-sm"
                    placeholder="Share your teaching experience, methodology, and what makes your sessions unique. Students want to know what to expect!"
                    required
                  ></textarea>
                <label className="label">
                  <span className="label-text-alt text-base-content/50">
                    {formData.description.length}/500 characters
                  </span>
                </label>
              </div>

              {/* Submit Section */}
              <div className="bg-base-200/50 rounded-xl p-6 border border-base-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-base-content">Ready to publish?</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-base-content/70">All required fields completed</span>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="loading loading-spinner loading-md"></div>
                      <span>Creating your tutorial...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <FaPlus />
                      <span>Publish Tutorial</span>
                    </div>
                  )}
                </button>
                
                <p className="text-xs text-base-content/50 text-center mt-3">
                  Your tutorial will be visible to students immediately after publishing
                </p>
              </div>
            </form>
          </div>

          {/* Helpful Tips */}
          <div className="mt-8 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-base-content mb-4 flex items-center gap-2">
              <FaLightbulb className="text-accent" />
              Pro Tips for Success
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-base-content text-sm">Professional Image</h4>
                  <p className="text-xs text-base-content/70">Use a clear, friendly photo that builds trust</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-base-content text-sm">Clear Description</h4>
                  <p className="text-xs text-base-content/70">Explain your teaching style and experience</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-base-content text-sm">Competitive Pricing</h4>
                  <p className="text-xs text-base-content/70">Research market rates for your subject</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-accent text-xs font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-base-content text-sm">Be Specific</h4>
                  <p className="text-xs text-base-content/70">Mention your expertise level and specializations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTutors;
