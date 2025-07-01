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
      <div className="py-16 bg-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content">Platform Statistics</h2>
            <p className="text-lg text-base-content/70">Join thousands of learners and expert tutors worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 mx-auto group-hover:bg-primary/30 transition-colors">
                <FaChalkboardTeacher className="text-3xl text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">Experienced Tutors</h3>
              <p className="text-4xl font-bold text-primary mb-2">{tutor.length}</p>
              <p className="text-base-content/70">Qualified professionals</p>
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6 mx-auto group-hover:bg-secondary/30 transition-colors">
                <FaStar className="text-3xl text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">Total Reviews</h3>
              <p className="text-4xl font-bold text-secondary mb-2">{totalReviews}</p>
              <p className="text-base-content/70">Student feedback</p>
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6 mx-auto group-hover:bg-accent/30 transition-colors">
                <FaGlobe className="text-3xl text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">Languages</h3>
              <p className="text-4xl font-bold text-accent mb-2">{languageCategories.length}</p>
              <p className="text-base-content/70">Available to learn</p>
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-neutral/20 rounded-full mb-6 mx-auto group-hover:bg-neutral/30 transition-colors">
                <FaUsers className="text-3xl text-neutral" />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-2">Active Users</h3>
              <p className="text-4xl font-bold text-neutral mb-2">{allUser.length}</p>
              <p className="text-base-content/70">Registered learners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Language Categories Section */}
      <div className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content">Explore Languages</h2>
            <p className="text-lg text-base-content/70">Choose from a wide variety of languages taught by expert tutors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languageCategories.map((item) => (
              <Link to={`/findTutors/${item.language}`} key={item.id}>
                <div className="bg-base-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-base-content group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-base-content/70">{item.teachers} teachers available</p>
                      </div>
                    </div>
                    <BsArrowRight className="text-base-content/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-base-content/60">
                    <span>Language ID: {item.id}</span>
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced How I Learn Section */}
      <section className="py-16 bg-base-200" id="how-i-learn">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content">How I Learn</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              I follow a disciplined, hands-on learning strategy focused on building real projects and improving daily. 
              My approach combines theoretical knowledge with practical application.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6 mx-auto">
                <FaCode className="text-3xl text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-base-content">Learn by Doing</h3>
              <p className="text-base-content/70 text-center leading-relaxed">
                I build real-world projects while learning, ensuring practical skill development and hands-on experience with modern technologies.
              </p>
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6 mx-auto">
                <FaLaptopCode className="text-3xl text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-base-content">Daily Practice</h3>
              <p className="text-base-content/70 text-center leading-relaxed">
                I dedicate 4-6 hours daily to structured practice, coding challenges, and hands-on development to maintain consistent growth.
              </p>
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-6 mx-auto">
                <FaBrain className="text-3xl text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-base-content">Problem Solving</h3>
              <p className="text-base-content/70 text-center leading-relaxed">
                I focus on debugging, improving logic, and learning from mistakes to develop strong analytical and problem-solving skills.
              </p>
            </div>
            <div className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
              <div className="flex items-center justify-center w-16 h-16 bg-neutral/20 rounded-full mb-6 mx-auto">
                <FaGraduationCap className="text-3xl text-neutral" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-base-content">Continuous Learning</h3>
              <p className="text-base-content/70 text-center leading-relaxed">
                I stay updated with latest technologies, follow industry best practices, and continuously expand my knowledge base.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tech Stack Section */}
      <section className="py-16 bg-base-100" id="tech-stack">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-base-content">Tech Stack Experience</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Technologies and tools I've worked with in various projects. From frontend frameworks to backend technologies, 
              I've built full-stack applications using modern development practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <SiReact className="text-2xl text-primary" />
                </div>
                <h4 className="font-bold text-xl text-base-content">Frontend</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiReact className="text-primary text-lg" />
                  <span>React.js</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiNextdotjs className="text-base-content text-lg" />
                  <span>Next.js</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiTailwindcss className="text-secondary text-lg" />
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiFramer className="text-accent text-lg" />
                  <span>Framer Motion</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiRedux className="text-neutral text-lg" />
                  <span>Redux Toolkit</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiTypescript className="text-primary text-lg" />
                  <span>TypeScript</span>
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <SiNodedotjs className="text-2xl text-secondary" />
                </div>
                <h4 className="font-bold text-xl text-base-content">Backend</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiNodedotjs className="text-secondary text-lg" />
                  <span>Node.js</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiExpress className="text-base-content text-lg" />
                  <span>Express.js</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiMongodb className="text-accent text-lg" />
                  <span>MongoDB</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiJavascript className="text-neutral text-lg" />
                  <span>JavaScript</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiTypescript className="text-primary text-lg" />
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <FaRocket className="text-secondary text-lg" />
                  <span>REST APIs</span>
                </li>
              </ul>
            </div>

            {/* Auth & Tools */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <SiFirebase className="text-2xl text-accent" />
                </div>
                <h4 className="font-bold text-xl text-base-content">Auth & Tools</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiFirebase className="text-accent text-lg" />
                  <span>Firebase Auth</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiJavascript className="text-neutral text-lg" />
                  <span>JWT</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiAxios className="text-primary text-lg" />
                  <span>Axios</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiPostman className="text-secondary text-lg" />
                  <span>Postman</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <FaLightbulb className="text-accent text-lg" />
                  <span>API Testing</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <FaUsers className="text-primary text-lg" />
                  <span>User Management</span>
                </li>
              </ul>
            </div>

            {/* Others */}
            <div className="bg-base-200 p-6 rounded-2xl shadow-lg border border-base-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neutral/20 rounded-lg flex items-center justify-center">
                  <SiGit className="text-2xl text-neutral" />
                </div>
                <h4 className="font-bold text-xl text-base-content">Others</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiGit className="text-neutral text-lg" />
                  <span>Git & GitHub</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiVercel className="text-base-content text-lg" />
                  <span>Vercel</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <SiNetlify className="text-secondary text-lg" />
                  <span>Netlify</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <FaStar className="text-accent text-lg" />
                  <span>Code Review</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <FaLaptopCode className="text-primary text-lg" />
                  <span>Responsive Design</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/80">
                  <FaRocket className="text-secondary text-lg" />
                  <span>Performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
