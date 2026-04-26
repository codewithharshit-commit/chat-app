import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

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
    </>
  );
};

export default App;
