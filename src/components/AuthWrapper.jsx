
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import HUD3DLoader from "./HUD3DLoader";

function AuthWrapper({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-green-400">
        <HUD3DLoader />
      </div>
    );
  }

  if (!user) {
    window.location.href = "/login"; // redirect if not logged in
    return null;
  }

  return children;
}

export default AuthWrapper;
