import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { updateProfile } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const SignUp = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const name = e.target.name.value;
        const photoUrl = e.target.photoUrl.value;

        // Update user profile
        updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            console.log("User profile updated successfully", user);
          })
          .catch((error) => {
            console.error("Error updating user profile:", error);
          });
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate("/");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Created Successfully with google",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[70vh]">
      <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
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
        <label className="label">Name</label>
        <input type="text" className="input" name="name" placeholder="Name" />
        <label className="label">Photo Url</label>
        <input
          type="text"
          className="input"
          name="photoUrl"
          placeholder="Photo Url"
        />
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
          Sign Up
        </button>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <hr className="my-4" />
        <p className="text-center text-sm flex items-center justify-center gap-1">
          Don't have an account?
          <a href="/login" className="link link-hover text-blue-500">
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
