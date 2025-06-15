import { Link } from "react-router";

const TutorCard = ({ tutors }) => {
  return (
    <div className="border-b-amber-300 border-r-red-600 border-l-green-600 border-t-blue-600 border-2 p-4 rounded-md shadow-md flex flex-col lg:flex-row justify-center items-center w-full gap-6 pr-2 overflow-hidden">
      <div className="w-full  lg:w-1/4">
        <img
          src={tutors.image}
          alt={tutors.userName}
          className="w-full h-auto object-cover rounded-md mb-4"
        />
      </div>
      <div className="w-full lg:w-3/4 flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{tutors.userName}</h3>
        <p className="">
          language:{" "}
          <span className="text-wrap max-w-full">{tutors.language}</span>
        </p>
        <p className="">
          Price: $ <span className=" text-wrap max-w-full">{tutors.price}</span>
        </p>

        <p className="">{tutors.description}</p>
        <p className="">
          ⭐:{" "}
          <span className=" text-wrap max-w-full">
            {tutors.reviewCount || 0}
          </span>{" "}
        </p>
        <div>
          <Link to={`/tutorDetails/${tutors._id}`}>
            <button className="bg-red-500 px-4 py-1 rounded-md  mt-4 cursor-pointer">
              view profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
