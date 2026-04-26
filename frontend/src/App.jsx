import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth) {
    return (
      <div>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }
  return (
    <>
      {/* <button onClick={logout}>logout</button> */}

      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/authPage" />}
        />
        <Route
          path="/authPage"
          element={!authUser ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/authPage" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
