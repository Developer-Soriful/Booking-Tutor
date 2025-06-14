import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, useLoaderData } from "react-router";
import UseAuth from "../Auth/UseAuth";
import axios from "axios";
import { getIdToken } from "firebase/auth";

const Home = () => {
  const languageCategories = useLoaderData();
  const [allUser, setAllUser] = useState([]);
  const [tutor, setTutor] = useState([]);
  const { user } = UseAuth();
  useEffect(() => {
    fetch(`http://localhost:3000/allFirebaseUsers`)
      .then((res) => res.json())
      .then((data) => setAllUser(data));
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token = await getIdToken(user);
      try {
        const res = await axios.get(`http://localhost:3000/allTutors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data) {
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
    <div>
      {/* this section for banner part */}
      <div className="w-full">
        {/* Banner Section */}
        <div className="carousel w-full max-h-[50vh] md:max-h-[70vh] rounded-lg overflow-hidden shadow-lg">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1581089786257-d34fe7d9bff6?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 1"
            />
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2">
              <a
                href="#slide4"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❮
              </a>
              <a
                href="#slide2"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1565688420536-11a4ddfa246f?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 2"
            />
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2">
              <a
                href="#slide1"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❮
              </a>
              <a
                href="#slide3"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1673515335586-f9f662c01482?q=80&w=2070&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 3"
            />
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2">
              <a
                href="#slide2"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❮
              </a>
              <a
                href="#slide4"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1660927604748-9b039cb31fc1?q=80&w=1936&auto=format&fit=crop"
              className="w-full h-full object-cover"
              alt="Banner 4"
            />
            <div className="absolute left-5 right-5 top-1/2 flex justify-between transform -translate-y-1/2">
              <a
                href="#slide3"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❮
              </a>
              <a
                href="#slide1"
                className="btn btn-circle bg-white/80 hover:bg-white text-black border-none"
              >
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* this is for tutor language and total users count ui  */}
      <div className="m-8">
        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <div className="card bg-base-100 shadow-xl">
            <p>Experienced Tutor</p>
            <h1 className="text-5xl font-bold">{tutor.length}</h1>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <p>Total Language</p>
            <h1 className="text-5xl font-bold">
              {languageCategories.length}
            </h1>{" "}
          </div>
          <div className="card bg-base-100 shadow-xl">
            <p>Total User</p>
            <h1 className="text-5xl font-bold">{allUser.length}</h1>{" "}
          </div>
        </div>
      </div>
      {/* this section for language - categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {languageCategories.map((item) => (
          <Link to={`/findTutors/${item.language}`} key={item.id}>
            <div className="flex items-center justify-between border rounded-lg p-4 hover:shadow-md cursor-pointer transition-all">
              <div className="flex items-center gap-4">
                {item.id}
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.teachers}</p>
                </div>
              </div>
              <BsArrowRight className="text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
