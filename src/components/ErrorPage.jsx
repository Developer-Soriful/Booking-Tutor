import { Link } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const ErrorPage = () => {
  return (
    <>
      <div>
        <Header />
        <div
          className="flex flex-col items-center justify-center min-h-screen bg-white px-6"
          style={{ minHeight: "calc(100vh - 134px)" }}
        >
          <h1 className="text-[8rem] font-extrabold text-red-600 drop-shadow-md">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center max-w-xl">
            Sorry, the page you’re looking for doesn’t exist or has been moved.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go Back Home
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ErrorPage;
