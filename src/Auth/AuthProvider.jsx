import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { Auth } from "./firebase";
import { GoogleAuthProvider } from "firebase/auth";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  // all state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // create user state and authentication logic here
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password);
  };
  //   this function for user login
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password);
  };
  // this is for google login
  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(Auth, provider);
  };
  //   this function for user logout
  const logoutUser = () => {
    return signOut(Auth).then(() => setUser(null));
  };
  //   this function for observing user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  //   user information state
  const userInfo = {
    googleLogin,
    createUser,
    loginUser,
    logoutUser,
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
