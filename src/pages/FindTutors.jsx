import { FaSearch } from "react-icons/fa";
import { useLoaderData, useParams } from "react-router";
import TutorCard from "./TutorCard";
import { useState } from "react";

const FindTutors = () => {
  const [search, setSearch] = useState("");
  const allTutorsLoad = useLoaderData();
  const { language } = useParams();

  let filteredTutors = [];

  if (search) {
    filteredTutors = allTutorsLoad.filter((tutor) =>
      tutor.language.toLowerCase().includes(search.toLowerCase())
    );
  } else if (language) {
    filteredTutors = allTutorsLoad.filter((tutor) =>
      tutor.language.toLowerCase().includes(language.toLowerCase())
    );
  } else {
    filteredTutors = allTutorsLoad; // ✅ Show all tutors by default
  }

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-5 text-center">
          Explore online tutors & teachers for learning a new language
        </h1>

        <div className="relative">
          <input
            className="w-full input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutors by language"
          />
          <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" />
        </div>

        <div className="flex flex-col gap-4">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutors={tutor} />
            ))
          ) : (
            <p className="text-center text-red-500 mt-5">No tutors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTutors;
