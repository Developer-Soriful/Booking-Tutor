import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router";
import TutorCard from "./TutorCard";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getIdToken } from "firebase/auth";
import UseAuth from "../Auth/UseAuth";
import Loading from "../components/Loading";

const FindTutors = () => {
  const [search, setSearch] = useState("");
  const [allTutorsLoad, setAllTutorsLoad] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const { user } = UseAuth();
  const { language } = useParams();

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (searchTerm) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          performSearch(searchTerm);
        }, 500); // Wait 500ms after user stops typing
      };
    })(),
    []
  );

  // Server-side search function
  const performSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      // If search is empty, load all tutors
      fetchAllTutors();
      return;
    }

    setSearchLoading(true);
    try {
      let headers = {};
      if (user) {
        const token = await getIdToken(user);
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await axios.get(
        `https://a01-server.vercel.app/searchTutors?language=${encodeURIComponent(searchTerm)}`,
        { headers }
      );
      if (res.data) {
        setAllTutorsLoad(res.data);
      }
    } catch (error) {
      console.log("Search error:", error);
      // Fallback to client-side search if server search fails
      fetchAllTutors();
    } finally {
      setSearchLoading(false);
    }
  };

  // Fetch all tutors
  const fetchAllTutors = async () => {
    setLoading(true);
    try {
      let headers = {};
      if (user) {
        const token = await getIdToken(user);
        headers.Authorization = `Bearer ${token}`;
      }
      
      const res = await axios.get("https://a01-server.vercel.app/allTutors", {
        headers
      });
      if (res.data) {
        setAllTutorsLoad(res.data);
      }
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  // Load initial data
  useEffect(() => {
    if (language) {
      // If language parameter exists, search for that specific language
      setSearch(language);
      performSearch(language);
    } else {
      // Load all tutors
      fetchAllTutors();
    }
  }, [language]);

  // Filter tutors based on language parameter (if no search is active)
  const getFilteredTutors = () => {
    if (search) {
      // If user is searching, return the search results
      return allTutorsLoad;
    } else if (language && !search) {
      // If language parameter exists but no search, filter client-side
      return allTutorsLoad.filter((tutor) =>
        tutor.language.toLowerCase().includes(language.toLowerCase())
      );
    } else {
      // Show all tutors
      return allTutorsLoad;
    }
  };

  const filteredTutors = getFilteredTutors();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center my-10">
      <div className="flex flex-col gap-4 w-full px-4">
        <h1 className="text-3xl font-bold mb-5 text-center text-base-content">
          Explore online tutors & teachers for learning a new language
        </h1>

        <div className="relative">
          <input
            className="w-full input bg-base-200 border-base-300 text-base-content placeholder-base-content/50 focus:border-primary"
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search tutors by language"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            {searchLoading ? (
              <div className="loading loading-spinner loading-sm text-primary"></div>
            ) : (
              <FaSearch className="text-base-content/50" />
            )}
          </div>
        </div>

        {/* Search Results Info */}
        {search && (
          <div className="text-center text-base-content/70">
            {searchLoading ? (
              <p>Searching for "{search}"...</p>
            ) : (
              <p>Found {filteredTutors.length} tutor(s) for "{search}"</p>
            )}
          </div>
        )}

        {/* Tutor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorCard key={tutor._id} tutors={tutor} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-base-content/70 text-lg mb-2">
                {search ? `No tutors found for "${search}"` : "No tutors available"}
              </p>
              <p className="text-base-content/50 text-sm">
                Try searching for a different language
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindTutors;


// commit 13
// commit 14
// commit 15 done all