import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg(error.message);
      });
  };
  // this is for google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        console.error(err.message);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-4">Login</h1>
      <p className="text-sm text-gray-500 mb-4">
        Please enter your email and password to login
      </p>
      <form
        onSubmit={handleSubmit}
        className="fieldset w-96 p-6 bg-base-200 rounded-lg shadow-lg"
      >
        <span
          onClick={handleGoogleLogin}
          className=" flex items-center justify-center gap-2 btn btn-neutral mb-4"
        >
          sign in with Google
          <span className="ml-2">
            <FaGoogle size={15} />
          </span>
        </span>
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          name="email"
          placeholder="Email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          name="password"
          placeholder="Password"
        />
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button type="submit" className="btn btn-neutral mt-4">
          Login
        </button>
        {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
        <hr className="my-4" />
        <p className="text-center text-sm flex items-center justify-center gap-1">
          Don't have an account?
          <a href="/signup" className="link link-hover text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
