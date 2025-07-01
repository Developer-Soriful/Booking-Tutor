import { Link } from "react-router";

const TutorCard = ({ tutors }) => {
  return (
    <div className="relative bg-base-100 border border-base-300 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl group overflow-hidden w-full max-w-full">
      {/* Language Badge */}
      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary/20 text-primary text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shadow-sm z-10 border border-primary/30">
        {tutors.language}
      </span>
      {/* Avatar */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 flex items-center justify-center mb-2 md:mb-0">
        <img
          src={tutors.image}
          alt={tutors.userName}
          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-2 border-primary/30 shadow-sm group-hover:border-primary transition-all duration-300"
        />
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col gap-1 sm:gap-2 w-full">
        <h3 className="text-lg sm:text-xl font-bold text-base-content flex items-center gap-2">
          {tutors.userName}
          {tutors.reviewCount > 10 && (
            <span className="ml-2 bg-secondary/20 text-secondary text-xs px-2 py-0.5 rounded-full font-medium border border-secondary/30">Top Rated</span>
          )}
        </h3>
        <p className="text-sm sm:text-base text-base-content/70">
          <span className="font-semibold text-primary">Price:</span> $ {tutors.price}
        </p>
        <p className="text-xs sm:text-sm text-base-content/60 line-clamp-2">{tutors.description}</p>
        <div className="flex items-center gap-2 sm:gap-3 mt-1">
          <span className="text-base sm:text-lg text-accent">⭐</span>
          <span className="font-semibold text-base-content/80 text-xs sm:text-sm">{tutors.reviewCount || 0} Reviews</span>
        </div>
        <div className="mt-3 sm:mt-4">
          <Link to={`/tutorDetails/${tutors._id}`}>
            <button className="w-full sm:w-auto bg-primary text-primary-content px-4 sm:px-5 py-2 rounded-lg shadow hover:bg-primary-focus transition-all font-semibold text-sm sm:text-base">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
