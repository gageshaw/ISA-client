import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  const [role, setRole] = useState("common");
  const [loading, setLoading] = useState(true);
  const [privateRoutes, setPrivateRoutes] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      //set currentUser
      setCurrentUser(user);

      //set role
      if (user) {
        const uid = user.uid.toString();

        axios
          .get("/users/" + uid)
          .then((response) => {
            setRole(response.data[0].role);
          })
          .catch((error) => console.log(error));

        //set privateRoutes
        // setPrivateRoutes({ PrivateRoutes });
        // console.log(privateRoutes);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    role,
    privateRoutes,
    setRole,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
