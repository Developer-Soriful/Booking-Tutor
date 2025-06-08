import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { useNavigate } from "react-router";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        navigate("/");
        alert("Login successful!");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
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
