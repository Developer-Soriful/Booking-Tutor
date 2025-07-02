import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, useLoaderData } from "react-router";
import UseAuth from "../Auth/UseAuth";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import { FaCode, FaLaptopCode, FaBrain, FaGraduationCap, FaUsers, FaStar, FaRocket, FaLightbulb, FaChalkboardTeacher, FaGlobe, FaBookOpen, FaGraduationCap as FaGradCap } from "react-icons/fa";
import { SiReact, SiTailwindcss, SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiJavascript, SiAxios, SiGit, SiGithub, SiVercel, SiNetlify, SiTypescript, SiNextdotjs, SiRedux, SiPostman } from "react-icons/si";

const Home = () => {
  const languageCategories = useLoaderData();
  const [totalReviews, setTotalReviews] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const [tutor, setTutor] = useState([]);
  const { user } = UseAuth();

  useEffect(() => {
    fetch(`https://a01-server.vercel.app/allFirebaseUsers`)
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getIdToken(user);
      try {
        const res = await axios.get(`https://a01-server.vercel.app/allTutors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data) {
          const totalReviews = res.data.reduce(
            (acc, curr) => acc + (curr.reviewCount || 0),
            0
          );
          setTotalReviews(totalReviews);
          setTutor(res.data);
        } else {
          console.log("token is not verified");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className="bg-base-100">
      {/* Enhanced Banner Section */}
      <div className="w-full relative">
        <div className="carousel w-full max-h-[60vh] md:max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1581089786257-d34fe7d9bff6?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 1"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-base-100">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Learn with Expert Tutors</h1>
                <p className="text-xl md:text-2xl mb-6">Master new languages with personalized guidance</p>
                <Link to="/findTutors">
                  <button className="bg-base-100 text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-base-200 transition-all">
                    Find Your Tutor
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-30">
              <a
                href="#slide4"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/50 to-primary/50 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1565688420536-11a4ddfa246f?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 2"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-base-100">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Interactive Learning</h1>
                <p className="text-xl md:text-2xl mb-6">Engage in real-time conversations and practice</p>
                <Link to="/findTutors">
                  <button className="bg-base-100 text-accent px-8 py-3 rounded-full font-bold text-lg hover:bg-base-200 transition-all">
                    Start Learning
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-30">
              <a
                href="#slide1"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/50 to-accent/50 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1673515335586-f9f662c01482?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 3"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-base-100">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Global Community</h1>
                <p className="text-xl md:text-2xl mb-6">Connect with tutors from around the world</p>
                <Link to="/findTutors">
                  <button className="bg-base-100 text-secondary px-8 py-3 rounded-full font-bold text-lg hover:bg-base-200 transition-all">
                    Join Community
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-30">
              <a
                href="#slide2"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral/50 to-primary/50 z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1660927604748-9b039cb31fc1?q=80&w=1936&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 4"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-base-100">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Flexible Schedule</h1>
                <p className="text-xl md:text-2xl mb-6">Learn at your own pace and convenience</p>
                <Link to="/findTutors">
                  <button className="bg-base-100 text-neutral px-8 py-3 rounded-full font-bold text-lg hover:bg-base-200 transition-all">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2 z-30">
              <a
                href="#slide3"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-circle bg-base-100/20 hover:bg-base-100/40 text-base-100 border-none backdrop-blur-sm"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaStar className="text-xs" />
              Platform Overview
            </div>
            <h2 className="text-5xl font-bold mb-6 text-base-content">Amazing Statistics</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Join thousands of learners and expert tutors worldwide in our growing educational community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-base-100/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 text-center group hover:-translate-y-2">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaChalkboardTeacher className="text-3xl text-primary-content" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                  <div className="w-2 h-2 bg-success-content rounded-full"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-3">Expert Tutors</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-focus bg-clip-text text-transparent mb-3">{tutor.length}</p>
              <p className="text-base-content/70 font-medium">Qualified professionals</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>

            <div className="bg-base-100/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 text-center group hover:-translate-y-2">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaStar className="text-3xl text-secondary-content" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full border-2 border-base-100 flex items-center justify-center">
                  <FaStar className="text-warning-content text-xs" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-3">Total Reviews</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-focus bg-clip-text text-transparent mb-3">{totalReviews}</p>
              <p className="text-base-content/70 font-medium">Student feedback</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <FaStar className="text-warning text-sm" />
                <FaStar className="text-warning text-sm" />
                <FaStar className="text-warning text-sm" />
                <FaStar className="text-warning text-sm" />
                <FaStar className="text-warning text-sm" />
              </div>
            </div>

            <div className="bg-base-100/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 text-center group hover:-translate-y-2">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaGlobe className="text-3xl text-accent-content" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-info rounded-full border-2 border-base-100 flex items-center justify-center">
                  <FaGlobe className="text-info-content text-xs" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-3">Languages</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-accent to-accent-focus bg-clip-text text-transparent mb-3">{languageCategories.length}</p>
              <p className="text-base-content/70 font-medium">Available to learn</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <div className="w-3 h-3 bg-accent rounded-full"></div>
              </div>
            </div>

            <div className="bg-base-100/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 text-center group hover:-translate-y-2">
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neutral to-neutral-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaUsers className="text-3xl text-neutral-content" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                  <FaUsers className="text-success-content text-xs" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-3">Active Users</h3>
              <p className="text-5xl font-bold bg-gradient-to-r from-neutral to-neutral-focus bg-clip-text text-transparent mb-3">{allUser.length}</p>
              <p className="text-base-content/70 font-medium">Registered learners</p>
              <div className="mt-4 flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="w-2 h-2 bg-success rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Language Categories Section */}
      <div className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaGlobe className="text-xs" />
              Language Categories
            </div>
            <h2 className="text-5xl font-bold mb-6 text-base-content">Explore Languages</h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
              Choose from a wide variety of languages taught by expert tutors from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languageCategories.map((item) => (
              <Link to={`/findTutors/${item.language}`} key={item.id}>
                <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <span className="text-3xl">{item.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-2xl text-base-content group-hover:text-primary transition-colors mb-1">{item.title}</h3>
                          <p className="text-base-content/70 font-medium">{item.teachers} expert tutors</p>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-base-200 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                        <BsArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-base-content/60 font-medium">Language ID: {item.id}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-gradient-to-r from-primary to-secondary text-primary-content px-3 py-1 rounded-full text-xs font-bold">
                          Popular
                        </span>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-warning text-xs" />
                          <span className="text-xs text-base-content/60">4.8</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-base-content/60 mb-1">
                        <span>Student Progress</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-base-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000 group-hover:w-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaGlobe className="text-xs" />
              Learning Categories
            </div>
            <h2 className="text-5xl font-bold mb-6 text-base-content">Explore Categories</h2>
            <p className="text-xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
              Discover diverse learning categories with expert tutors specialized in each field
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programming & Technology */}
            <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaCode className="text-3xl text-primary-content" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold">Hot</span>
                      <span className="bg-success text-success-content px-3 py-1 rounded-full text-xs font-bold">Trending</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">Programming & Technology</h3>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Master modern programming languages, web development, and cutting-edge technologies with expert guidance.
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">25+</div>
                      <div className="text-xs text-base-content/60">Languages</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">150+</div>
                      <div className="text-xs text-base-content/60">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">4.9★</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </div>

                  {/* Popular Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">JavaScript</span>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium">Python</span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">React</span>
                    <span className="bg-neutral/20 text-neutral px-3 py-1 rounded-full text-xs font-medium">Node.js</span>
                  </div>

                  {/* Action Button */}
                  <Link to="/findTutors/programming" className="w-full bg-gradient-to-r from-primary to-primary-focus text-primary-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center block">
                    Explore Programming
                  </Link>
                </div>
              </div>
            </div>

            {/* Languages & Communication */}
            <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaGlobe className="text-3xl text-secondary-content" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-secondary text-secondary-content px-3 py-1 rounded-full text-xs font-bold">Popular</span>
                      <span className="bg-warning text-warning-content px-3 py-1 rounded-full text-xs font-bold">Global</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-secondary transition-colors">Languages & Communication</h3>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Learn world languages, improve communication skills, and connect with native speakers worldwide.
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">15+</div>
                      <div className="text-xs text-base-content/60">Languages</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">200+</div>
                      <div className="text-xs text-base-content/60">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral">4.8★</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </div>

                  {/* Popular Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium">English</span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">Spanish</span>
                    <span className="bg-neutral/20 text-neutral px-3 py-1 rounded-full text-xs font-medium">French</span>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">German</span>
                  </div>

                  {/* Action Button */}
                  <Link to="/findTutors/languages" className="w-full bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center block">
                    Explore Languages
                  </Link>
                </div>
              </div>
            </div>

            {/* Business & Finance */}
            <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaGraduationCap className="text-3xl text-accent-content" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-accent text-accent-content px-3 py-1 rounded-full text-xs font-bold">Premium</span>
                      <span className="bg-info text-info-content px-3 py-1 rounded-full text-xs font-bold">Expert</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-accent transition-colors">Business & Finance</h3>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Develop business acumen, financial literacy, and entrepreneurial skills with industry professionals.
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">20+</div>
                      <div className="text-xs text-base-content/60">Subjects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral">80+</div>
                      <div className="text-xs text-base-content/60">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">4.9★</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </div>

                  {/* Popular Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">Marketing</span>
                    <span className="bg-neutral/20 text-neutral px-3 py-1 rounded-full text-xs font-medium">Finance</span>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">Management</span>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium">Strategy</span>
                  </div>

                  {/* Action Button */}
                  <Link to="/findTutors/business" className="w-full bg-gradient-to-r from-accent to-accent-focus text-accent-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center block">
                    Explore Business
                  </Link>
                </div>
              </div>
            </div>

            {/* Arts & Creative */}
            <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-neutral to-neutral-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaBookOpen className="text-3xl text-neutral-content" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-neutral text-neutral-content px-3 py-1 rounded-full text-xs font-bold">Creative</span>
                      <span className="bg-warning text-warning-content px-3 py-1 rounded-full text-xs font-bold">Trending</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-neutral transition-colors">Arts & Creative</h3>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Unleash your creativity with expert guidance in arts, design, music, and creative expression.
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral">12+</div>
                      <div className="text-xs text-base-content/60">Arts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">60+</div>
                      <div className="text-xs text-base-content/60">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">4.7★</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </div>

                  {/* Popular Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-neutral/20 text-neutral px-3 py-1 rounded-full text-xs font-medium">Drawing</span>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">Music</span>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium">Design</span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">Photography</span>
                  </div>

                  {/* Action Button */}
                  <Link to="/findTutors/arts" className="w-full bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center block">
                    Explore Arts
                  </Link>
                </div>
              </div>
            </div>

            {/* Science & Mathematics */}
            <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaBrain className="text-3xl text-primary-content" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold">Academic</span>
                      <span className="bg-success text-success-content px-3 py-1 rounded-full text-xs font-bold">Certified</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">Science & Mathematics</h3>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Master complex scientific concepts and mathematical principles with qualified educators.
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">18+</div>
                      <div className="text-xs text-base-content/60">Subjects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">120+</div>
                      <div className="text-xs text-base-content/60">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">4.8★</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </div>

                  {/* Popular Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">Physics</span>
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium">Chemistry</span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">Biology</span>
                    <span className="bg-neutral/20 text-neutral px-3 py-1 rounded-full text-xs font-medium">Calculus</span>
                  </div>

                  {/* Action Button */}
                  <Link to="/findTutors/science" className="w-full bg-gradient-to-r from-primary to-primary-focus text-primary-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center block">
                    Explore Science
                  </Link>
                </div>
              </div>
            </div>

            {/* Health & Wellness */}
            <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Category Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <FaUsers className="text-3xl text-secondary-content" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-secondary text-secondary-content px-3 py-1 rounded-full text-xs font-bold">Wellness</span>
                      <span className="bg-info text-info-content px-3 py-1 rounded-full text-xs font-bold">Healthy</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-base-content mb-3 group-hover:text-secondary transition-colors">Health & Wellness</h3>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Improve your physical and mental well-being with certified health and fitness professionals.
                  </p>

                  {/* Category Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">10+</div>
                      <div className="text-xs text-base-content/60">Programs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">90+</div>
                      <div className="text-xs text-base-content/60">Tutors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neutral">4.9★</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </div>

                  {/* Popular Topics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-medium">Yoga</span>
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">Fitness</span>
                    <span className="bg-neutral/20 text-neutral px-3 py-1 rounded-full text-xs font-medium">Nutrition</span>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">Meditation</span>
                  </div>

                  {/* Action Button */}
                  <Link to="/findTutors/health" className="w-full bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center block">
                    Explore Wellness
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* View All Categories Button */}
          <div className="text-center mt-12">
            <Link to="/findTutors" className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-content px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 inline-block">
              View All Categories
              <FaGlobe className="inline-block ml-2 text-sm" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced How I Learn Section */}
      <section className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden" id="how-i-learn">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaBrain className="text-xs" />
              Learning Methodology
            </div>
            <h2 className="text-5xl font-bold mb-6 text-base-content">How I Learn</h2>
            <p className="text-xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
              I follow a disciplined, hands-on learning strategy focused on building real projects and improving daily.
              My approach combines theoretical knowledge with practical application for maximum effectiveness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaCode className="text-3xl text-primary-content" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-base-content group-hover:text-primary transition-colors">Learn by Doing</h3>
                <p className="text-base-content/70 text-center leading-relaxed">
                  I build real-world projects while learning, ensuring practical skill development and hands-on experience with modern technologies.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaLaptopCode className="text-3xl text-secondary-content" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-base-content group-hover:text-secondary transition-colors">Daily Practice</h3>
                <p className="text-base-content/70 text-center leading-relaxed">
                  I dedicate 4-6 hours daily to structured practice, coding challenges, and hands-on development to maintain consistent growth.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <div className="bg-secondary/20 rounded-full px-4 py-2">
                    <span className="text-secondary font-bold text-sm">4-6 hrs/day</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaBrain className="text-3xl text-accent-content" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-base-content group-hover:text-accent transition-colors">Problem Solving</h3>
                <p className="text-base-content/70 text-center leading-relaxed">
                  I focus on debugging, improving logic, and learning from mistakes to develop strong analytical and problem-solving skills.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <div className="flex items-center gap-2 text-accent">
                    <FaLightbulb className="text-lg" />
                    <span className="font-bold text-sm">Analytical</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-neutral to-neutral-focus rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaGraduationCap className="text-3xl text-neutral-content" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-base-content group-hover:text-neutral transition-colors">Continuous Learning</h3>
                <p className="text-base-content/70 text-center leading-relaxed">
                  I stay updated with latest technologies, follow industry best practices, and continuously expand my knowledge base.
                </p>
                <div className="mt-6 flex items-center justify-center">
                  <div className="bg-neutral/20 rounded-full px-4 py-2">
                    <span className="text-neutral font-bold text-sm">Always Growing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tech Stack Section */}
      <section className="py-20 bg-gradient-to-br from-base-100 via-base-200 to-base-100 relative overflow-hidden" id="tech-stack">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/3 w-56 h-56 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaLaptopCode className="text-xs" />
              Technology Stack
            </div>
            <h2 className="text-5xl font-bold mb-6 text-base-content">Tech Stack Experience</h2>
            <p className="text-xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
              Technologies and tools I've worked with in various projects. From frontend frameworks to backend technologies,
              I've built full-stack applications using modern development practices and industry standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <SiReact className="text-3xl text-primary-content" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-base-content group-hover:text-primary transition-colors">Frontend</h4>
                    <p className="text-base-content/60 text-sm">Modern UI/UX</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <SiReact className="text-primary text-lg" />
                    </div>
                    <span className="font-medium">React.js</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-base-content/10 rounded-lg flex items-center justify-center">
                      <SiNextdotjs className="text-base-content text-lg" />
                    </div>
                    <span className="font-medium">Next.js</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <SiTailwindcss className="text-secondary text-lg" />
                    </div>
                    <span className="font-medium">Tailwind CSS</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <SiFramer className="text-accent text-lg" />
                    </div>
                    <span className="font-medium">Framer Motion</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-neutral/20 rounded-lg flex items-center justify-center">
                      <SiRedux className="text-neutral text-lg" />
                    </div>
                    <span className="font-medium">Redux Toolkit</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <SiTypescript className="text-primary text-lg" />
                    </div>
                    <span className="font-medium">TypeScript</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <SiNodedotjs className="text-3xl text-secondary-content" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-base-content group-hover:text-secondary transition-colors">Backend</h4>
                    <p className="text-base-content/60 text-sm">Server & Database</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <SiNodedotjs className="text-secondary text-lg" />
                    </div>
                    <span className="font-medium">Node.js</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-base-content/10 rounded-lg flex items-center justify-center">
                      <SiExpress className="text-base-content text-lg" />
                    </div>
                    <span className="font-medium">Express.js</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <SiMongodb className="text-accent text-lg" />
                    </div>
                    <span className="font-medium">MongoDB</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-neutral/20 rounded-lg flex items-center justify-center">
                      <SiJavascript className="text-neutral text-lg" />
                    </div>
                    <span className="font-medium">JavaScript</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <SiTypescript className="text-primary text-lg" />
                    </div>
                    <span className="font-medium">TypeScript</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <FaRocket className="text-secondary text-lg" />
                    </div>
                    <span className="font-medium">REST APIs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Auth & Tools */}
            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <SiFirebase className="text-3xl text-accent-content" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-base-content group-hover:text-accent transition-colors">Auth & Tools</h4>
                    <p className="text-base-content/60 text-sm">Security & Testing</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <SiFirebase className="text-accent text-lg" />
                    </div>
                    <span className="font-medium">Firebase Auth</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-neutral/20 rounded-lg flex items-center justify-center">
                      <SiJavascript className="text-neutral text-lg" />
                    </div>
                    <span className="font-medium">JWT</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <SiAxios className="text-primary text-lg" />
                    </div>
                    <span className="font-medium">Axios</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <SiPostman className="text-secondary text-lg" />
                    </div>
                    <span className="font-medium">Postman</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <FaLightbulb className="text-accent text-lg" />
                    </div>
                    <span className="font-medium">API Testing</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FaUsers className="text-primary text-lg" />
                    </div>
                    <span className="font-medium">User Management</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Others */}
            <div className="bg-base-100/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-neutral to-neutral-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                    <SiGit className="text-3xl text-neutral-content" />
                  </div>
                  <div>
                    <h4 className="font-bold text-2xl text-base-content group-hover:text-neutral transition-colors">Others</h4>
                    <p className="text-base-content/60 text-sm">Tools & Deployment</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-neutral/20 rounded-lg flex items-center justify-center">
                      <SiGit className="text-neutral text-lg" />
                    </div>
                    <span className="font-medium">Git & GitHub</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-base-content/10 rounded-lg flex items-center justify-center">
                      <SiVercel className="text-base-content text-lg" />
                    </div>
                    <span className="font-medium">Vercel</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <SiNetlify className="text-secondary text-lg" />
                    </div>
                    <span className="font-medium">Netlify</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <FaStar className="text-accent text-lg" />
                    </div>
                    <span className="font-medium">Code Review</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <FaLaptopCode className="text-primary text-lg" />
                    </div>
                    <span className="font-medium">Responsive Design</span>
                  </li>
                  <li className="flex items-center gap-4 text-base-content/80 group-hover:text-base-content transition-colors">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <FaRocket className="text-secondary text-lg" />
                    </div>
                    <span className="font-medium">Performance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Most Demanded Tutors Section */}
      <section className="py-20 bg-gradient-to-br from-base-200 via-base-100 to-base-200 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <FaStar className="text-xs" />
              Top Rated Tutors
            </div>
            <h2 className="text-5xl font-bold mb-6 text-base-content">Most Demanded Tutors</h2>
            <p className="text-xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
              Meet our most popular and highly-rated tutors who are in high demand among students
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Top Tutor 1 */}
            {tutor.length > 0 && (
              <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  {/* Tutor Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <span className="text-3xl font-bold text-primary-content">
                            {tutor[0]?.name?.charAt(0)?.toUpperCase() || 'T'}
                          </span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                          <FaStar className="text-success-content text-xs" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-primary text-primary-content px-3 py-1 rounded-full text-xs font-bold">#1 Ranked</span>
                          <span className="bg-success text-success-content px-3 py-1 rounded-full text-xs font-bold">Verified</span>
                        </div>
                        <h3 className="text-2xl font-bold text-base-content mb-1">{tutor[0]?.name || 'Expert Tutor'}</h3>
                        <p className="text-base-content/70">{tutor[0]?.language || 'Programming'} Expert</p>
                      </div>
                    </div>

                    <p className="text-base-content/70 mb-6 leading-relaxed">
                      {tutor[0]?.description || 'Highly experienced tutor with excellent teaching methodology and proven track record of student success.'}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{tutor[0]?.reviewCount || 150}+</div>
                        <div className="text-xs text-base-content/60">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{tutor[0]?.rating || 4.9}★</div>
                        <div className="text-xs text-base-content/60">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">${tutor[0]?.price || 25}/hr</div>
                        <div className="text-xs text-base-content/60">Rate</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link to={`/tutorDetails/${tutor[0]?._id}`} className="flex-1 bg-gradient-to-r from-primary to-primary-focus text-primary-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center">
                        View Profile
                      </Link>
                      <button className="flex-1 bg-base-200 text-base-content px-6 py-3 rounded-xl font-semibold hover:bg-base-300 transition-all duration-300">
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Top Tutor 2 */}
            {tutor.length > 1 && (
              <div className="bg-base-100/90 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-base-300 group hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  {/* Tutor Header */}
                  <div className="p-8 pb-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary-focus rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <span className="text-3xl font-bold text-secondary-content">
                            {tutor[1]?.name?.charAt(0)?.toUpperCase() || 'E'}
                          </span>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full border-2 border-base-100 flex items-center justify-center">
                          <FaStar className="text-warning-content text-xs" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-secondary text-secondary-content px-3 py-1 rounded-full text-xs font-bold">#2 Ranked</span>
                          <span className="bg-warning text-warning-content px-3 py-1 rounded-full text-xs font-bold">Popular</span>
                        </div>
                        <h3 className="text-2xl font-bold text-base-content mb-1">{tutor[1]?.name || 'Senior Tutor'}</h3>
                        <p className="text-base-content/70">{tutor[1]?.language || 'Language'} Specialist</p>
                      </div>
                    </div>

                    <p className="text-base-content/70 mb-6 leading-relaxed">
                      {tutor[1]?.description || 'Dedicated tutor with extensive experience in language teaching and personalized learning approaches.'}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{tutor[1]?.reviewCount || 120}+</div>
                        <div className="text-xs text-base-content/60">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{tutor[1]?.rating || 4.8}★</div>
                        <div className="text-xs text-base-content/60">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-neutral">${tutor[1]?.price || 22}/hr</div>
                        <div className="text-xs text-base-content/60">Rate</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Link to={`/tutorDetails/${tutor[1]?._id}`} className="flex-1 bg-gradient-to-r from-secondary to-secondary-focus text-secondary-content px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105 text-center">
                        View Profile
                      </Link>
                      <button className="flex-1 bg-base-200 text-base-content px-6 py-3 rounded-xl font-semibold hover:bg-base-300 transition-all duration-300">
                        Book Session
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* More Popular Tutors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tutor 3 */}
            {tutor.length > 2 && (
              <div className="bg-base-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-focus rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <span className="text-accent-content font-bold text-lg">
                        {tutor[2]?.name?.charAt(0)?.toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-base-content group-hover:text-accent transition-colors">{tutor[2]?.name || 'Advanced Tutor'}</h4>
                      <p className="text-base-content/60 text-sm">{tutor[2]?.language || 'Advanced'} Expert</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-warning text-sm" />
                      <span className="text-sm font-medium">{tutor[2]?.rating || 4.7}</span>
                    </div>
                    <span className="text-accent font-bold">${tutor[2]?.price || 20}/hr</span>
                  </div>
                  <Link to={`/tutorDetails/${tutor[2]?._id}`} className="w-full bg-accent/10 text-accent px-4 py-2 rounded-lg font-medium hover:bg-accent hover:text-accent-content transition-all duration-300 text-center block">
                    View Profile
                  </Link>
                </div>
              </div>
            )}

            {/* Tutor 4 */}
            {tutor.length > 3 && (
              <div className="bg-base-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-neutral to-neutral-focus rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <span className="text-neutral-content font-bold text-lg">
                        {tutor[3]?.name?.charAt(0)?.toUpperCase() || 'S'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-base-content group-hover:text-neutral transition-colors">{tutor[3]?.name || 'Specialist Tutor'}</h4>
                      <p className="text-base-content/60 text-sm">{tutor[3]?.language || 'Specialized'} Tutor</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-warning text-sm" />
                      <span className="text-sm font-medium">{tutor[3]?.rating || 4.6}</span>
                    </div>
                    <span className="text-neutral font-bold">${tutor[3]?.price || 18}/hr</span>
                  </div>
                  <Link to={`/tutorDetails/${tutor[3]?._id}`} className="w-full bg-neutral/10 text-neutral px-4 py-2 rounded-lg font-medium hover:bg-neutral hover:text-neutral-content transition-all duration-300 text-center block">
                    View Profile
                  </Link>
                </div>
              </div>
            )}

            {/* Tutor 5 */}
            {tutor.length > 4 && (
              <div className="bg-base-100/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 group hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-focus rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <span className="text-primary-content font-bold text-lg">
                        {tutor[4]?.name?.charAt(0)?.toUpperCase() || 'P'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors">{tutor[4]?.name || 'Professional Tutor'}</h4>
                      <p className="text-base-content/60 text-sm">{tutor[4]?.language || 'Professional'} Guide</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-warning text-sm" />
                      <span className="text-sm font-medium">{tutor[4]?.rating || 4.5}</span>
                    </div>
                    <span className="text-primary font-bold">${tutor[4]?.price || 16}/hr</span>
                  </div>
                  <Link to={`/tutorDetails/${tutor[4]?._id}`} className="w-full bg-primary/10 text-primary px-4 py-2 rounded-lg font-medium hover:bg-primary hover:text-primary-content transition-all duration-300 text-center block">
                    View Profile
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* View All Tutors Button */}
          <div className="text-center mt-12">
            <Link to="/findTutors" className="bg-gradient-to-r from-primary via-secondary to-accent text-primary-content px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 inline-block">
              View All Tutors
              <FaChalkboardTeacher className="inline-block ml-2 text-sm" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
