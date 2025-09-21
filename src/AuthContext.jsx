import { createContext, useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Firebase user
  const [token, setToken] = useState(null);     // JWT from backend
  const [loading, setLoading] = useState(true); // Loading state

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Get JWT from backend
          const res = await axios.post("https://news-portal-server-seven-bice.vercel.app/jwt", {
            email: currentUser.email,
            uid: currentUser.uid,
          });
          setToken(res.data.token);
        } catch (err) {
          console.error("Failed to get JWT:", err);
          setToken(null);
        }
      } else {
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ---------------- Auth functions ----------------
  const registerWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use auth in any component
export const useAuth = () => useContext(AuthContext);
